<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\SchoolService;
use App\Http\Controllers\Controller;
use App\Http\Requests\School\StoreSchoolRequest;
use App\Http\Requests\School\UpdateSchoolRequest;
use App\Models\School;

class SchoolController extends Controller
{
    protected $schoolService;
    function __construct(SchoolService $schoolService)
    {
        $this->schoolService=$schoolService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->schoolService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolRequest $request)
    {
        return $this->schoolService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return $this->schoolService->single($school);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolRequest $request, School $school)
    {
        return $this->schoolService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        $school->delete();
        return response('', 204);
    }
}
