<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\TeacherService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teacher\StoreTeacherRequest;
use App\Http\Requests\Teacher\UpdateTeacherRequest;
use App\Models\Teacher;

class TeacherController extends Controller
{
    protected $teacherService;
    function __construct(TeacherService $teacherService)
    {
        $this->teacherService=$teacherService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->teacherService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        return $this->teacherService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        return $this->teacherService->single($teacher);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        return $this->teacherService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response('', 204);
    }
}
