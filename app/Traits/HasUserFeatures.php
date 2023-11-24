<?php

namespace App\Traits;

use App\Enums\SettingType;

trait HasUserFeatures
{
    use HasFeatures;

    public function features(): array
    {
        return array_merge(
            $this->role->features(),
            $this->getSetting(SettingType::FEATURES),
        ) ?? [];
    }
}
