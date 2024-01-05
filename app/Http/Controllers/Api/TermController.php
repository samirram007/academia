<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\TermService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Term\StoreTermRequest;
use App\Http\Requests\Term\UpdateTermRequest;
use App\Models\Term;

class TermController extends Controller
{
    protected $termService;
    function __construct(TermService $termService)
    {
        $this->termService=$termService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->termService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTermRequest $request)
    {
        return $this->termService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Term $term)
    {
        return $this->termService->single($term);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTermRequest $request, Term $term)
    {
        return $this->termService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Term $term)
    {
        $term->delete();
        return response('', 204);
    }
}
