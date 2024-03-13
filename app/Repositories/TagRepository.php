<?php

namespace App\Repositories;

use App\Enums\TagType;
use App\Models\Tag;

class TagRepository
{
    public function getOccupations()
    {
        $tags = Tag::where('type', TagType::OCCUPATION)->orderBy('value', 'ASC');

        return $tags->get();
    }

    public function getChurchPositions(array $attributes = [])
    {
        $positions = Tag::where('type', TagType::CHURCH_POSITION)->orderBy('value', 'ASC');

        if ($value = data_get($attributes, 'value')) {
            if (is_array($value)) {
                $positions->whereIn('value', $value);
            } else {
                $positions->where('value', $value);
            }
        }

        return $positions->get();
    }

    public function getChurchMinistries(array $attributes = [])
    {
        $ministries = Tag::where('type', TagType::CHURCH_MINISTRY)->orderBy('value', 'ASC');

        if ($value = data_get($attributes, 'value')) {
            if (is_array($value)) {
                $ministries->whereIn('value', $value);
            } else {
                $ministries->where('value', $value);
            }
        }

        return $ministries->get();
    }
}
