<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\StateService;
use App\Http\Controllers\Controller;
use App\Http\Requests\State\StoreStateRequest;
use App\Http\Requests\State\UpdateStateRequest;
use App\Models\State;

class StateController extends Controller
{
    protected $stateService;
    function __construct(StateService $stateService)
    {
        $this->stateService=$stateService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->stateService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStateRequest $request)
    {
        return $this->stateService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(State $state)
    {
        return $this->stateService->single($state);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStateRequest $request, State $state)
    {
        return $this->stateService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(State $state)
    {
        $state->delete();
        return response('', 204);
    }
}
