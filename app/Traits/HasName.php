<?php

namespace App\Traits;

use Illuminate\Support\Arr;

trait HasName
{
    public function initials()
    {
        if ($this->first_name) {
            $initials =
                substr($this->first_name, 0, 1).
                substr($this->last_name, 0, 1);
        } else {
            $initials = substr($this->email, 0, 1);
        }

        return strtolower($initials);
    }

    public function getNameAttribute()
    {
        if (is_null($this->first_name)) {
            return $this->getNameFromEmail();
        }

        return ucwords(trim($this->first_name.' '.$this->last_name));
    }

    public function shortName($default = 'Person'): string
    {
        return $this->first_name ?: $default;
    }

    public function getNameFromEmail()
    {
        $lhs = Arr::first(explode('@', $this->email));
        $segments = explode('.', $lhs);
        $name = implode(' ', $segments);

        return ucfirst($name);
    }
}
