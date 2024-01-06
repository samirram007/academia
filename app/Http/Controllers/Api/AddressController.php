<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\AddressService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;
use App\Models\Address;

class AddressController extends Controller
{
    protected $addressService;
    function __construct(AddressService $addressService)
    {
        $this->addressService=$addressService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->addressService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAddressRequest $request)
    {
        return $this->addressService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        return $this->addressService->single($address);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        // dd($address);
        return $this->addressService->update($request, $address);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return response('', 204);
    }
}
