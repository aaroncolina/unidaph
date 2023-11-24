<?php

namespace App\Models;

use App\Traits\BaseTrait;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use BaseTrait;

    protected $primaryKey = 'uuid';
}
