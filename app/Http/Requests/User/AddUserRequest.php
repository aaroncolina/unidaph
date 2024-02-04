<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class AddUserRequest extends FormRequest
{
    use CommonUserRequestRules;

    public function rules(): array
    {
        return array_merge($this->genericRules(), [
            'email' => array_merge($this->genericRules('email'), ['unique:users,email']),
        ]);
    }
}
