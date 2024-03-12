<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
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

        if ($church_ids = data_get($payload, 'church')) {
            $users->whereHas(
                'church',
                fn (Builder $query) => $query->whereIn('id', $church_ids)
            );
        }

        if ($church_managed_ids = data_get($payload, 'church_managed')) {
            $users->whereHas(
                'church',
                fn (Builder $query) => $query->whereIn('id', $church_managed_ids)
            );
        }

        return $users
            ->orderBy('first_name', 'asc')
            ->paginate(data_get($payload, 'per_page', 15))
            ->withQueryString();
    }

    public function getUserViaName(array $attributes)
    {

        $user = User::query();

        if ($first_name = data_get($attributes, 'first_name')) {
            $user->where('first_name', 'LIKE', "%{$first_name}%");
        }

        if ($middle_name = data_get($attributes, 'middle_name')) {
            $user->where('middle_name', 'LIKE', "%{$middle_name}%");
        }

        if ($last_name = data_get($attributes, 'last_name')) {
            $user->where('last_name', 'LIKE', "%{$last_name}%");
        }

        return $user->first();

    }
}
