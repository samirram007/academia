<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\BoardService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Board\StoreBoardRequest;
use App\Http\Requests\Board\UpdateBoardRequest;
use App\Models\Board;

class BoardController extends Controller
{
    protected $boardService;
    function __construct(BoardService $boardService)
    {
        $this->boardService=$boardService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->boardService->all($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request)
    {
        return $this->boardService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        return $this->boardService->single($board);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Board $board)
    {
        return $this->boardService->update($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
        $board->delete();
        return response('', 204);
    }
}
