<?php

namespace App\Models;

use App\Enums\TagType;

class Tag extends BaseModel
{
    protected $fillable = [
        'type',
        'value',
        'category',
        'description',
    ];

    public TagType $type;
}
