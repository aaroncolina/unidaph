<?php

namespace App\Models;

class Church extends BaseModel
{
    protected $fillable = [
        'name',
        'category',
        'password',
    ];

    public function parentChurch()
    {
        return $this->hasOne(Church::class, 'id', 'parent_id');
    }
}
