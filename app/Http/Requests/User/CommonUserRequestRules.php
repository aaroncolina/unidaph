<?php

namespace App\Http\Requests\User;

use App\Enums\CivilStatus;
use App\Enums\Gender;
use App\Enums\TagType;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

trait CommonUserRequestRules
{
    protected function genericRules($key = null)
    {
        $rules = [
            'id' => ['nullable', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:300'],
            'contact_number' => ['nullable', 'string'],
            'date_of_birth' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', Rule::in(Gender::values())],
            'civil_status' => ['required', 'string', Rule::in(CivilStatus::values())],
            'date_of_conversion' => ['nullable', 'date'],
            'date_of_baptism' => ['nullable', 'date'],
            'occupation' => [
                Rule::exists('tags', 'id')->where(function (Builder $query) {
                    return $query->where('type', TagType::OCCUPATION);
                }),
            ],
            'church_position' => ['array'],
            'church_ministries' => ['array'],
            'church_position.*' => [
                Rule::exists('tags', 'id')->where(function (Builder $query) {
                    return $query->where('type', TagType::CHURCH_POSITION);
                }),
            ],
            'church_ministries.*' => [
                Rule::exists('tags', 'id')->where(function (Builder $query) {
                    return $query->where('type', TagType::CHURCH_MINISTRY);
                }),
            ],
            'church' => ['exists:churches,id'],
        ];

        if ($key) {
            return data_get($rules, $key);
        }

        return $rules;
    }
}
