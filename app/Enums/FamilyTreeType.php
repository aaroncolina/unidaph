<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum FamilyTreeType: string
{
    use EnumToArray;

    case SPOUSE = 'spouse';
    case PARENT = 'parent';
    case SIBLING = 'sibling';
    case CHILD = 'child';
}
