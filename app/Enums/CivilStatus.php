<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum CivilStatus: string
{
    use EnumToArray;

    case SINGLE = 'single';
    case MARRIED = 'married';
    case SEPARATED = 'separated';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';
}
