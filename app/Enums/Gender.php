<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum Gender: string
{
    use EnumToArray;

    case MALE = 'male';
    case FEMALE = 'female';
}
