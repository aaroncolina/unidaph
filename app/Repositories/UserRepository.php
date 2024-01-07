<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    /**
     * @param  array  $payload
     * @return Collection<User>
     */
    public function getUsers($payload)
    {
        $users = User::with(['church', 'church.parentChurch']);

        if ($search = data_get($payload, 'search')) {
            $users->where('first_name', 'LIKE', "%{$search}%")
                ->orWhere('middle_name', 'LIKE', "%{$search}%")
                ->orWhere('last_name', 'LIKE', "%{$search}%");
        }

        return $users
            ->orderBy('first_name', 'asc')
            ->paginate(data_get($payload, 'per_page', 15))
            ->withQueryString();
    }
}
