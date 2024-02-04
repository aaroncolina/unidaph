<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
{
    use CommonUserRequestRules;

    public function rules(): array
    {
        return array_merge($this->genericRules(), [
            'id' => array_merge($this->genericRules('id'), ['required']),
        ]);
    }
}
