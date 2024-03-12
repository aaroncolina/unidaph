<?php

namespace App\Traits;

use App\Enums\SettingType;
use App\Models\Settings;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

trait HasSettings
{
    public function getMorphableKey(): string
    {
        return get_class($this);
    }

    public function settings()
    {
        return $this->morphMany(Settings::class, 'morphable');
    }

    // get setting value
    public function getSetting(SettingType $key)
    {
        $settings = $this->getCache();
        $value = Arr::get($settings, $key->value);

        return ($value !== '') ? $value : null;
    }

    // create-update setting
    public function setSetting(SettingType $key, $value)
    {
        $this->storeSetting($key->value, $value);
        $this->setCache();
    }

    // create-update multiple settings at once
    public function setSettings(array $data = [])
    {
        foreach ($data as $key => $value) {
            $this->storeSetting($key, $value);
        }
        $this->setCache();
    }

    private function storeSetting(string $key, $value)
    {
        $record = Settings::where([
            'morphable_id' => $this->uuid,
            'morphable_type' => $this->getMorphableKey(),
            'key' => $key,
        ])->first();

        if ($record) {
            $record->value = $value;
            $record->save();
        } else {
            $data = new Settings(['key' => $key, 'value' => $value]);
            $this->settings()->save($data);
        }
    }

    private function getCacheKey()
    {
        return strtolower(class_basename(__CLASS__)).'_settings_'.$this->id;
    }

    private function getCache()
    {
        if (Cache::has($this->getCacheKey())) {
            return Cache::get($this->getCacheKey());
        }

        return $this->setCache();
    }

    private function setCache()
    {
        if (Cache::has($this->getCacheKey())) {
            Cache::forget($this->getCacheKey());
        }
        $settings = ($this->settings ?? collect([]))->pluck('value', 'key');
        Cache::forever($this->getCacheKey(), $settings);

        return $this->getCache();
    }
}
