<?php

namespace App\Models;

use App\Enums\SettingType;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Settings extends BaseModel
{
    protected $fillable = [
        'key',
        'value',
    ];

    protected $casts = [
        'value' => 'json',
    ];

    public SettingType $key;

    protected $primaryKey = 'uuid';

    public function morphable(): MorphTo
    {
        return $this->morphTo();
    }
}
