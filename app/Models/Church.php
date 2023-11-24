<?php

namespace App\Models;

use App\Enums\ChurchCategory;

class Church extends BaseModel
{
    public string $name;

    public ChurchCategory $category;

    public ?Church $parentChurch;

    protected $fillable = [
        'name',
        'category',
        'password',
    ];

    public function parentChurch()
    {
        return $this->belongsTo(Church::class, 'parent_id');
    }
}
