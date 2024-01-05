<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DeveloperService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Developer\StoreDeveloperRequest;
use App\Http\Requests\Developer\UpdateDeveloperRequest;
use App\Models\Developer;

class DeveloperController extends Controller
{
    protected $developerService;
    function __construct(DeveloperService $developerService)
    {
        $this->developerService=$developerService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->developerService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeveloperRequest $request)
    {
        return $this->developerService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Developer $developer)
    {
        return $this->developerService->single($developer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeveloperRequest $request, Developer $developer)
    {
        return $this->developerService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Developer $developer)
    {
        $developer->delete();
        return response('', 204);
    }
}
