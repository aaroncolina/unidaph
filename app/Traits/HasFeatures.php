<?php

namespace App\Traits;

use App\Enums\Feature;
use App\Enums\SettingType;
use Illuminate\Support\Arr;

trait HasFeatures
{
    use HasSettings;

    public function getFeaturesAttribute()
    {
        return $this->features();
    }

    public function features(): array
    {
        return $this->getSetting(SettingType::FEATURES) ?? [];
    }

    public function getFeature(Feature $key)
    {
        $features = $this->features();

        return Arr::get($features, $key->value);
    }

    public function setFeature(Feature $key, $value): void
    {
        $features = $this->getSetting(SettingType::FEATURES);
        $features[$key->value] = $value;

        $this->setSetting(
            SettingType::FEATURES,
            $features
        );
    }

    /**
     * @param array[Feature $key, mixed $value] $data
     */
    public function setFeatures(array $data = []): void
    {
        $features = $this->features();
        foreach ($data as $details) {
            if (isset($details['key']) && $details['key']->value != '') {
                $features[$details['key']->value] = $details['value'];
            }
        }

        $this->setSetting(
            SettingType::FEATURES,
            $features
        );
    }

    public function canAccess(): bool
    {
        return $this->getFeature(Feature::ACCESS);
    }

    public function canEditOwnProfile(): bool
    {
        return $this->getFeature(Feature::EDIT_OWN_PROFILE);
    }

    public function canGenerateReports(): bool
    {
        return $this->getFeature(Feature::GENERATE_REPORTS);
    }

    public function canAddRole(): bool
    {
        return $this->getFeature(Feature::ADD_ROLE);
    }

    public function canEditRole(): bool
    {
        return $this->getFeature(Feature::EDIT_ROLE);
    }

    public function canEditRoleFeature(): bool
    {
        return $this->getFeature(Feature::EDIT_ROLE_FEATURE);
    }

    public function canDeleteRole(): bool
    {
        return $this->getFeature(Feature::DELETE_ROLE);
    }

    public function canViewUser(): bool
    {
        return $this->getFeature(Feature::VIEW_USER);
    }

    public function canAddUser(): bool
    {
        return $this->getFeature(Feature::ADD_USER);
    }

    public function canEditUser(): bool
    {
        return $this->getFeature(Feature::EDIT_USER);
    }

    public function canEditUserFeature(): bool
    {
        return $this->getFeature(Feature::EDIT_USER_FEATURE);
    }

    public function canDeleteUser(): bool
    {
        return $this->getFeature(Feature::EDIT_USER_FEATURE);
    }

    public function canAddChurch(): bool
    {
        return $this->getFeature(Feature::ADD_CHURCH);
    }

    public function canEditChurch(): bool
    {
        return $this->getFeature(Feature::EDIT_CHURCH);
    }

    public function canDeleteChurch(): bool
    {
        return $this->getFeature(Feature::DELETE_CHURCH);
    }

    public function canAccessNationalRecords(): bool
    {
        return $this->getFeature(Feature::ACCESS_NATIONAL_RECORDS);
    }

    public function canAccessDistrictRecords(): bool
    {
        return $this->getFeature(Feature::ACCESS_DISTRICT_RECORDS);
    }

    public function canAccessLocalRecords(): bool
    {
        return $this->getFeature(Feature::ACCESS_LOCAL_RECORDS);
    }
}
