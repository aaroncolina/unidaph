<?php

namespace App\Http\Transformer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSpiritualProfileTransformer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date_of_conversion' => $this->date_of_conversion,
            'date_of_baptism' => $this->date_of_baptism,
            'baptismal_location' => $this->baptismal_location,
        ];
    }
}
