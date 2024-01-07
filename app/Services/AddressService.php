<?php

namespace App\Services;

use App\Models\Address;
use App\Http\Resources\Address\AddressResource;
use App\Http\Resources\Address\AddressCollection;
use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;

/**
 * Class AddressService.
 */
class AddressService
{
    public function all()
    {
        $addresses= Address::query()->orderBy('id', 'desc')->paginate();
        return new AddressCollection($addresses);
    }

    public function single(Address $address)
    {
        // TODO: Implement single() method

        return new AddressResource($address);
    }

    public function create(StoreAddressRequest $request)
    {
        $data = $request->validated();
        $address = Address::create($data);
        return response(new AddressResource($address), 201);
    }

    public function update(UpdateAddressRequest $request, Address $address)
    {

        $data = $request->validated();
        $address->update(array_filter($data));
        return response(new AddressResource($address), 201);
    }

}
