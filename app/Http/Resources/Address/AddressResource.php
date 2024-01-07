<?php

namespace App\Http\Resources\Address;

use Illuminate\Http\Request;
use App\Http\Resources\Country\CountryResource;
use App\Http\Resources\State\StateResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'user_id'=>$this->user_id,
        'address_type'=>$this->address_type,
        'address_line_1'=>$this->address_line_1,
        'address_line_2'=>$this->address_line_2,
        'city'=>$this->city,
        'post_office'=>$this->post_office,
        'rail_station'=>$this->rail_station,
        'police_station'=>$this->police_station,
        'district'=>$this->district,
        'state_id'=>$this->state_id,
        'country_id'=>$this->country_id,
        'state'=>new StateResource($this->state),
        'country'=>new CountryResource($this->state->country),
        'pincode'=>$this->pincode,
        'latitude'=>$this->latitude,
        'longitude'=>$this->longitude,
        'display'=>$this->display()
        ];
    }
}
