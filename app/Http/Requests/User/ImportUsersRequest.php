<?php

namespace App\Http\Requests\User;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class ImportUsersRequest extends FormRequest
{
    use CommonUserRequestRules;

    public function prepareForValidation()
    {
        $data = [];
        foreach ($this->data as $index => $details) {
            $data[$index] = $details;
            $data[$index]['gender'] = strtolower($details['gender']);
            $data[$index]['civil_status'] = strtolower($details['civil_status']);
            $data[$index]['date_of_birth'] = Carbon::parse($details['date_of_birth']);
            $data[$index]['date_of_conversion'] = Carbon::parse($details['date_of_conversion']);
            $data[$index]['date_of_baptism'] = Carbon::parse($details['date_of_baptism']);
        }
        $this->merge([
            'data' => $data,
        ]);
    }

    public function rules(): array
    {
        return [
            'church' => $this->genericRules('church'),
            'data' => ['array'],
            'data.*.first_name' => $this->genericRules('first_name'),
            'data.*.middle_name' => $this->genericRules('middle_name'),
            'data.*.last_name' => $this->genericRules('last_name'),
            'data.*.email' => $this->genericRules('email'),
            'data.*.contact_number' => $this->genericRules('contact_number'),
            'data.*.date_of_birth' => $this->genericRules('date_of_birth'),
            'data.*.gender' => $this->genericRules('gender'),
            'data.*.civil_status' => $this->genericRules('civil_status'),
            'data.*.date_of_conversion' => $this->genericRules('date_of_conversion'),
            'data.*.date_of_baptism' => $this->genericRules('date_of_baptism'),
            'data.*.church_position' => ['nullable', 'string'],
            'data.*.church_ministries' => ['nullable', 'string'],
        ];
    }
}
