<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\SectionService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Section\StoreSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;
use App\Models\Section;

class SectionController extends Controller
{
    protected $sectionService;
    function __construct(SectionService $sectionService)
    {
        $this->sectionService=$sectionService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->sectionService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        return $this->sectionService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return $this->sectionService->single($section);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSectionRequest $request, Section $section)
    {
        return $this->sectionService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return response('', 204);
    }
}
