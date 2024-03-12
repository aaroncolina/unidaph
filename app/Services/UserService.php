<?php

namespace App\Services;

use App\Enums\TagType;
use App\Models\User;
use App\Repositories\UserRepository;

class UserService
{
    public function __construct(
        private UserRepository $userRepository
    ) {

    }

    /**
     * @return User | null
     */
    public function createUser(array $attributes)
    {
        $user = User::create($attributes);

        return $this->updateUser($user, $attributes);
    }

    /**
     * @return User
     */
    public function updateUser(User $user, array $attributes)
    {
        $user->fill($attributes);
        $user->church_id = data_get($attributes, 'church', null);
        $user->save();

        $this->updateUserSpiritualProfile($user, $attributes);

        if ($occupation_id = data_get($attributes, 'occupation', null)) {
            $this->updateOccupation($user, $occupation_id);
        }

        if ($ministry_ids = data_get($attributes, 'church_ministries', null)) {
            $this->updateMinistries($user, $ministry_ids);
        }

        if ($position_ids = data_get($attributes, 'church_positions', null)) {
            $this->updatePositions($user, $position_ids);
        }

        return $user->fresh();
    }

    public function updateUserSpiritualProfile(User $user, array $attributes)
    {
        return $user
            ->spiritualProfile()
            ->updateOrCreate(['user_id' => $user->uuid], $attributes);
    }

    public function updateOccupation(User $user, int $id)
    {
        return $user
            ->occupations()
            ->syncWithPivotValues($id, ['type' => TagType::OCCUPATION]);
    }

    public function updateMinistries(User $user, array $ids)
    {
        return $user
            ->ministries()
            ->syncWithPivotValues($ids, ['type' => TagType::CHURCH_MINISTRY]);
    }

    public function updatePositions(User $user, array $ids)
    {
        return $user
            ->positions()
            ->syncWithPivotValues($ids, ['type' => TagType::CHURCH_POSITION]);
    }

    /**
     * @return User
     */
    public function generateUser()
    {
        return User::create();
    }
}
