<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum ChurchCategory: string
{
    use EnumToArray;

    case NATIONAL = 'national';
    case DISTRICT = 'district';
    case LOCAL = 'local';
    case OUTREACH = 'outreach';
}
