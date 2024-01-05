<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\CampusService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Campus\StoreCampusRequest;
use App\Http\Requests\Campus\UpdateCampusRequest;
use App\Models\Campus;

class CampusController extends Controller
{
    protected $campusService;
    function __construct(CampusService $campusService)
    {
        $this->campusService=$campusService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->campusService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampusRequest $request)
    {
        return $this->campusService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Campus $campus)
    {
        return $this->campusService->single($campus);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampusRequest $request, Campus $campus)
    {
        return $this->campusService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campus $campus)
    {
        $campus->delete();
        return response('', 204);
    }
}
