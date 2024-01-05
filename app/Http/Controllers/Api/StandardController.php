<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\StandardService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Standard\StoreStandardRequest;
use App\Http\Requests\Standard\UpdateStandardRequest;
use App\Models\Standard;

class StandardController extends Controller
{
    protected $standardService;
    function __construct(StandardService $standardService)
    {
        $this->standardService=$standardService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->standardService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStandardRequest $request)
    {
        return $this->standardService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Standard $standard)
    {
        return $this->standardService->single($standard);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStandardRequest $request, Standard $standard)
    {
        return $this->standardService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Standard $standard)
    {
        $standard->delete();
        return response('', 204);
    }
}
