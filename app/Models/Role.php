<?php

namespace App\Models;

use App\Enums\RoleType;
use App\Traits\HasFeatures;

class Role extends BaseModel
{
    use HasFeatures;

    public RoleType $name;

    protected $primaryKey = 'uuid';
}
