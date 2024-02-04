<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\AddUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Http\Requests\User\UserListRequest;
use App\Http\Transformer\UserTransformer;
use App\Models\User;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private UserRepository $userRepository,
        private TagRepository $tagRepository,
        private UserService $userService,
    ) {
    }

    public function index(UserListRequest $request): Response
    {
        return Inertia::render('Member/List', [
            'members' => UserTransformer::collection(
                $this->userRepository->getUsers($request->all())
            ),
            'request' => $request->all(),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Member/AddEdit', [
            'request' => $request->all(),
        ]);
    }

    public function store(AddUserRequest $request): RedirectResponse
    {
        $user = $this->userService->createUser($request->all());

        return Redirect::route('members.show', [
            'user' => $user->id,
        ]);
    }

    public function show(Request $request, User $user): Response
    {
        $this->loadUserRelations($user);

        return Inertia::render('Member/AddEdit', [
            'member' => new UserTransformer($user),
            'viewOnly' => true,
        ]);
    }

    public function edit(Request $request, User $user): Response
    {
        $this->loadUserRelations($user);

        return Inertia::render('Member/AddEdit', [
            'request' => $request->all(),
            'member' => new UserTransformer($user),
        ]);
    }

    public function update(EditUserRequest $request, User $user): RedirectResponse
    {
        $user = $this->userService->updateUser($user, $request->all());

        return Redirect::route('members.show', [
            'user' => $user->id,
        ]);
    }

    protected function loadUserRelations(User $user)
    {
        $user->load([
            'church',
            'church.parentChurch',
            'spiritualProfile',
            'ministries',
            'positions',
            'occupations',
        ]);
    }
}
