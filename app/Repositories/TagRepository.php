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

    public function getChurchPositions()
    {
        $positions = Tag::where('type', TagType::CHURCH_POSITION)->orderBy('value', 'ASC');

        return $positions->get();
    }

    public function getChurchMinistries()
    {
        $ministries = Tag::where('type', TagType::CHURCH_MINISTRY)->orderBy('value', 'ASC');

        return $ministries->get();
    }
}
