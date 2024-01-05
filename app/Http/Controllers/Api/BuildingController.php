<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\BuildingService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Building\StoreBuildingRequest;
use App\Http\Requests\Building\UpdateBuildingRequest;
use App\Models\Building;

class BuildingController extends Controller
{
    protected $buildingService;
    function __construct(BuildingService $buildingService)
    {
        $this->buildingService=$buildingService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->buildingService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBuildingRequest $request)
    {
        return $this->buildingService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Building $building)
    {
        return $this->buildingService->single($building);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBuildingRequest $request, Building $building)
    {
        return $this->buildingService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Building $building)
    {
        $building->delete();
        return response('', 204);
    }
}
