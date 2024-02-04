<?php

namespace App\Enums;

use App\Enums\Trait\EnumToArray;

enum SettingType: string
{
    use EnumToArray;

    case FEATURES = 'features';
    case UI_SETTINGS = 'ui_settings';
}
