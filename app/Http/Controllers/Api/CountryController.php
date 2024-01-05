<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\CountryService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Country\StoreCountryRequest;
use App\Http\Requests\Country\UpdateCountryRequest;
use App\Models\Country;

class CountryController extends Controller
{
    protected $countryService;
    function __construct(CountryService $countryService)
    {
        $this->countryService=$countryService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->countryService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCountryRequest $request)
    {
        return $this->countryService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Country $country)
    {
        return $this->countryService->single($country);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCountryRequest $request, Country $country)
    {
        return $this->countryService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        $country->delete();
        return response('', 204);
    }
}
