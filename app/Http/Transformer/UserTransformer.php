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

        return array_merge($data, [
            'name' => $this->name,
        ]);
    }
}
