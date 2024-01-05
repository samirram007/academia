<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DriverService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Driver\StoreDriverRequest;
use App\Http\Requests\Driver\UpdateDriverRequest;
use App\Models\Driver;

class DriverController extends Controller
{
    protected $driverService;
    function __construct(DriverService $driverService)
    {
        $this->driverService=$driverService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->driverService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDriverRequest $request)
    {
        return $this->driverService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        return $this->driverService->single($driver);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        return $this->driverService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response('', 204);
    }
}
