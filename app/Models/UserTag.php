<?php

namespace App\Models;

use App\Enums\TagType;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserTag extends Pivot
{
    public TagType $type;
}
