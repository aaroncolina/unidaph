<?php

namespace App\Models;

class UserSpiritualProfile extends BaseModel
{
    protected $fillable = [
        'user_id',
        'date_of_conversion',
        'date_of_baptism',
        'baptismal_location',
        'description',
    ];
}
