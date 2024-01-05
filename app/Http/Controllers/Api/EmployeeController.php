<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\EmployeeService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Models\Employee;

class EmployeeController extends Controller
{
    protected $employeeService;
    function __construct(EmployeeService $employeeService)
    {
        $this->employeeService=$employeeService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->employeeService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        return $this->employeeService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return $this->employeeService->single($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        return $this->employeeService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response('', 204);
    }
}
