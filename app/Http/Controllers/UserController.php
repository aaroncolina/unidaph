<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\AddUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Http\Requests\User\ImportUsersRequest;
use App\Http\Requests\User\UserListRequest;
use App\Http\Transformer\UserTransformer;
use App\Models\User;
use App\Repositories\ChurchRepository;
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
        private TagRepository $tagRepogsitory,
        private UserService $userService,
        private ChurchRepository $churchRepositry,
    ) {
    }

    public function index(UserListRequest $request): Response
    {
        $church_managed = $request->user()->churchManaged;

        return Inertia::render('Member/List', [
            'members' => UserTransformer::collection(
                $this->userRepository->getUsers(
                    array_merge($request->all(), [
                        'church_managed' => $church_managed->pluck('id')->toArray(),
                    ])
                )
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
        $attributes = $request->all();
        $existingUser = $this->userRepository->getUserViaName($attributes);

        if (! $existingUser) {
            $user = $this->userService->createUser($attributes);

            $request->session()->flash('toast', [
                'message' => 'Successfully added a user!',
                'type' => 'success',
            ]);

            return Redirect::route('members.show', ['user' => $user->id]);
        } else {

            $request->session()->flash('toast', [
                'message' => 'This user is already existing',
                'type' => 'error',
            ]);

            return Redirect::route('members.create');
        }
    }

    public function show(Request $request, User $user): Response
    {
        $this->loadUserRelations($user);

        return Inertia::render('Member/AddEdit', array_merge([
            'member' => new UserTransformer($user),
            'viewOnly' => true,
        ], $request->all()));
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

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            $request->session()->flash('toast', [
                'message' => 'You cannot delete your own account.',
                'type' => 'error',
            ]);

            return Redirect::route('members.index');
        }

        $user->delete();

        $request->session()->flash('toast', [
            'message' => 'Member deleted!',
            'type' => 'success',
        ]);

        return Redirect::route('members.index');
    }

    public function import(): Response
    {
        return Inertia::render('Member/Import');
    }

    public function upload(ImportUsersRequest $request)
    {
        $church = $this->churchRepositry->getChurchById($request->get('church'));

        $data = collect($request->input('data'));

        $church_ministries = $this->tagRepogsitory->getChurchMinistries([
            'value' => $data->pluck('ministries')->toArray(),
        ]);
        $church_positions = $this->tagRepogsitory->getChurchPositions([
            'value' => $data->pluck('church_position')->toArray(),
        ]);

        foreach ($data as $value) {
            $ministry = $church_ministries->filter(function ($item) use ($value) {
                return $item->value == $value['ministries'];
            })->first();

            $position = $church_positions->filter(function ($item) use ($value) {
                return $item->value == $value['church_position'];
            })->first();

            $existingUser = $this->userRepository->getUserViaName($value);

            $payload = array_merge($value, [
                'church' => $church->id,
                'church_ministries' => [$ministry->id],
                'church_positions' => [$position->id],
            ]);

            if (! $existingUser) {
                $this->userService->createUser($payload);
            } else {
                $this->userService->updateUser($existingUser, $payload);
            }
        }

        $request->session()->flash('toast', [
            'message' => 'Members imported!',
            'type' => 'success',
        ]);

        return Redirect::route('members.index');
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
