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

     /**
 * @OA\Schema(
 *     schema="AddressResource",
 *     title="Address Data",
 *     description="Data for address-related data",
 *     @OA\Property(property="user_id",type="integer",description="User ID associated with the address"),
 *     @OA\Property(property="address_type",type="string",description="Type of address (e.g., home, work)"),
 *     @OA\Property(property="address_line_1",type="string",description="First line of address"),
 *     @OA\Property(property="address_line_2",type="string",description="Second line of address"),
 *     @OA\Property(property="display",type="string",description="Formatted display of the address"),
 * )
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
