<?php

namespace App\Http\Transformer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTransformer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'gender' => $this->gender,
            'civil_status' => $this->civil_status,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'date_of_death' => $this->date_of_death,
            'update_at' => $this->update_at,
            'church' => new ChurchTransformer($this->whenLoaded('church')),
            'church_positions' => TagTransformer::collection($this->whenLoaded('positions')),
            'church_ministries' => TagTransformer::collection($this->whenLoaded('ministries')),
            'occupations' => TagTransformer::collection($this->whenLoaded('occupations')),
            'spiritual_profile' => new UserSpiritualProfileTransformer($this->whenLoaded('spiritualProfile')),

        ];
    }
}
