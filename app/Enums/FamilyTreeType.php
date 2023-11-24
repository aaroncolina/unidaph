<?php

namespace App\Enums;

enum FamilyTreeType: string
{
    case SPOUSE = 'spouse';
    case PARENT = 'parent';
    case SIBLING = 'sibling';
    case CHILD = 'child';
}
