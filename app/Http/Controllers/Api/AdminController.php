<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\AdminService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
use App\Models\Admin;

class AdminController extends Controller
{
    protected $adminService;
    function __construct(AdminService $adminService)
    {
        $this->adminService=$adminService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->adminService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        return $this->adminService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return $this->adminService->single($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        return $this->adminService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response('', 204);
    }
}
