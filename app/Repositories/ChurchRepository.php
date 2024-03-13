<?php

namespace App\Repositories;

use App\Enums\ChurchCategory;
use App\Models\Church;

class ChurchRepository
{
    public function getChurchByCategory(ChurchCategory $category)
    {
        return Church::with('parentChurch')
            ->where('category', $category)
            ->orderBy('name', 'ASC')
            ->get();
    }

    public function getChurchById(string $id)
    {
        return Church::with('parentChurch')->where('id', $id)->first();
    }
}
