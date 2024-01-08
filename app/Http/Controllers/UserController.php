<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserListRequest;
use App\Http\Transformer\UserTransformer;
use App\Repositories\UserRepository;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private UserRepository $userRepository
    ) {
    }

    public function index(UserListRequest $request): Response
    {
        return Inertia::render('User/List', [
            'members' => UserTransformer::collection(
                $this->userRepository->getUsers($request->all())
            ),
            'request' => $request->all(),
        ]);
    }
}
