<?php

namespace App\Models;

class Tag extends BaseModel
{
    protected $fillable = [
        'type',
        'value',
        'category',
        'description',
    ];
}
