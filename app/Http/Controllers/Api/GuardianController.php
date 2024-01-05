<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\GuardianService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Guardian\StoreGuardianRequest;
use App\Http\Requests\Guardian\UpdateGuardianRequest;
use App\Models\Guardian;

class GuardianController extends Controller
{
    protected $guardianService;
    function __construct(GuardianService $guardianService)
    {
        $this->guardianService=$guardianService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->guardianService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuardianRequest $request)
    {
        return $this->guardianService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guardian $guardian)
    {
        return $this->guardianService->single($guardian);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuardianRequest $request, Guardian $guardian)
    {
        return $this->guardianService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guardian $guardian)
    {
        $guardian->delete();
        return response('', 204);
    }
}
