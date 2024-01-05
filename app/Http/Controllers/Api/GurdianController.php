<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\GurdianService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Gurdian\StoreGurdianRequest;
use App\Http\Requests\Gurdian\UpdateGurdianRequest;
use App\Models\Gurdian;

class GurdianController extends Controller
{
    protected $gurdianService;
    function __construct(GurdianService $gurdianService)
    {
        $this->gurdianService=$gurdianService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->gurdianService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGurdianRequest $request)
    {
        return $this->gurdianService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gurdian $gurdian)
    {
        return $this->gurdianService->single($gurdian);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGurdianRequest $request, Gurdian $gurdian)
    {
        return $this->gurdianService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gurdian $gurdian)
    {
        $gurdian->delete();
        return response('', 204);
    }
}
