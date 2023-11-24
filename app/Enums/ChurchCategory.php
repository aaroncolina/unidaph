<?php

namespace App\Enums;

enum ChurchCategory: string
{
    case NATIONAL = 'national';
    case DISTRICT = 'district';
    case LOCAL = 'local';
    case OUTREACH = 'outreach';
}
