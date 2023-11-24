<?php

namespace App\Models;

class UserCareer extends BaseModel
{
    protected $fillable = [
        'title',
        'company',
        'address',
        'start_date',
        'end_date',
        'description',
    ];
}
