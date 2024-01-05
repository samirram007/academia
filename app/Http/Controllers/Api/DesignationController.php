<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DesignationService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Designation\StoreDesignationRequest;
use App\Http\Requests\Designation\UpdateDesignationRequest;
use App\Models\Designation;

class DesignationController extends Controller
{
    protected $designationService;
    function __construct(DesignationService $designationService)
    {
        $this->designationService=$designationService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->designationService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesignationRequest $request)
    {
        return $this->designationService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Designation $designation)
    {
        return $this->designationService->single($designation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesignationRequest $request, Designation $designation)
    {
        return $this->designationService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Designation $designation)
    {
        $designation->delete();
        return response('', 204);
    }
}
