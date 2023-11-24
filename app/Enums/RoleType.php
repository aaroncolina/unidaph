<?php

namespace App\Enums;

enum RoleType: string
{
    case MODERATOR = 'moderator';
    case NATIONAL_ADMIN = 'national_admin';
    case DISTRICT_ADMIN = 'district_admin';
    case LOCAL_ADMIN = 'local_admin';
}
