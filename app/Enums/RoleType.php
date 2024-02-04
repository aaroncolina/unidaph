<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum RoleType: string
{
    use EnumToArray;

    case MODERATOR = 'moderator';
    case NATIONAL_ADMIN = 'national_admin';
    case DISTRICT_ADMIN = 'district_admin';
    case LOCAL_ADMIN = 'local_admin';
    case MEMBER = 'member';
}
