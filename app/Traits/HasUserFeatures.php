<?php

namespace App\Traits;

use App\Enums\Feature;
use App\Enums\SettingType;
use App\Models\Church;

trait HasUserFeatures
{
    use HasFeatures;

    public function features(): array
    {
        return array_merge(
            $this?->role?->features() ?? [],
            $this->getSetting(SettingType::FEATURES) ?? [],
        ) ?? [];
    }

    public function getChurchManagedAttribute()
    {
        $churchManaged = $this->getFeature(Feature::CHURCH_MANAGED);

        if ($churchManaged === 'all') {
            return Church::all();
        }

        if (is_array($churchManaged)) {
            return Church::whereIn('uuid', $churchManaged)->get();
        }

        return Church::where('uuid', $churchManaged)->get();

    }
}
