<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum TagType: string
{
    use EnumToArray;

    case TALENT = 'talent';
    case CHURCH_MINISTRY = 'church_ministry';
    case CHURCH_POSITION = 'church_position';
    case OCCUPATION = 'occupation';
}
