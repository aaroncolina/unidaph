<?php

namespace App\Enums;

enum CivilStatus: string
{
    case SINGLE = 'single';
    case MARRIED = 'married';
    case SEPARATED = 'separated';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';
}
