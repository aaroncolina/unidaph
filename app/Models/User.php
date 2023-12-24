<?php

namespace App\Models;

use App\Enums\CivilStatus;
use App\Enums\Gender;
use App\Enums\TagType;
use App\Traits\BaseTrait;
use App\Traits\HasName;
use App\Traits\HasSettings;
use App\Traits\HasUserFeatures;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use BaseTrait,
        HasApiTokens,
        HasName,
        HasSettings,
        HasUserFeatures,
        Notifiable;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'email',
        'contact_number',
        'gender',
        'civil_status',
        'date_of_birth',
        'birth_address',
        'date_of_death',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $primaryKey = 'uuid';

    public ?Gender $gender;

    public ?CivilStatus $civil_status;

    public ?Church $church;

    public ?Role $role;

    public Collection $family;

    public Collection $education;

    public Collection $career;

    public Collection $tags;

    public function church()
    {
        return $this->hasOne(Church::class, 'church_id');
    }

    public function role()
    {
        return $this->hasOne(Role::class, 'role_id');
    }

    public function family()
    {
        return $this->belongsToMany(
            User::class,
            'user_family',
            'user_id',
            'related_id'
        )->withPivot([
            'type',
        ]);
    }

    public function education()
    {
        return $this->hasMany(UserEducation::class, 'user_id');
    }

    public function career()
    {
        return $this->hasMany(UserCareer::class, 'user_id');
    }

    public function spiritualProfile()
    {
        return $this->hasOne(UserSpiritualProfile::class, 'user_id');
    }

    public function tags()
    {
        return $this->belongsToMany(
            Tag::class,
            'user_tags',
            'user_id',
            'tag_id',
        )->withPivot([
            'type',
        ])->using(
            UserTag::class
        );
    }

    public function ministries()
    {
        return $this->tags()->wherePivot(
            'type',
            '=',
            TagType::CHURCH_MINISTRY->value
        );
    }

    public function positions()
    {
        return $this->tags()->wherePivot(
            'type',
            '=',
            TagType::CHURCH_POSITION->value
        );
    }

    public function talents()
    {
        return $this->tags()->wherePivot(
            'type',
            '=',
            TagType::CHURCH_POSITION->value
        );
    }
}
