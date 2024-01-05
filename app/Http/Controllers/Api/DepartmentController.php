<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\DepartmentService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;

class DepartmentController extends Controller
{
    protected $departmentService;
    function __construct(DepartmentService $departmentService)
    {
        $this->departmentService=$departmentService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->departmentService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        return $this->departmentService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return $this->departmentService->single($department);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        return $this->departmentService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return response('', 204);
    }
}
