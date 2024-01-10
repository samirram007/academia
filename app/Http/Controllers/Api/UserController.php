<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;


class UserController extends Controller
{
    protected $userService;
    function __construct(UserService $userService)
    {
        $this->userService=$userService;
    }
/**
 * @OA\Get(
 *     path="/api/users",
 *     tags={"Users"},
 *     summary="Get a list of users",
 *     description="Returns a list of users",
 *     security={{ "sanctum": {} }},
 *     @OA\Parameter(name="page",in="query",description="Page number for pagination",
 *         @OA\Schema(type="integer", default=1)
 *     ),
 *     @OA\Parameter(name="limit",in="query",description="Number of items per page",
 *         @OA\Schema(type="integer", default=10)
 *     ),
 *     @OA\Parameter(name="filter",in="query",description="Filter criteria",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(name="search",in="query",description="Search criteria",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(response=200,description="Successful operation",
 *         @OA\JsonContent(
 *           type="array",
 *           @OA\Items(ref="#/components/schemas/UserResource")
 *         )
 *     )
 * )
 */
    public function index(Request $request)
    {
        return $this->userService->all($request);
    }
/**
 * @OA\Post(
 *     path="/api/users",
 *     tags={"Users"},
 *     summary="Create a new user",
 *     description="Endpoint to create a new user",
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string", maxLength=255),
 *             @OA\Property(property="user_type", type="string", enum={"student", "teacher","admin","driver"}),
 *             @OA\Property(property="username", type="string", maxLength=10),
 *             @OA\Property(property="email", type="string", format="email"),
 *             @OA\Property(property="password", type="string"),
 *             @OA\Property(property="password_confirmation", type="string")
 *         )
 *     ),
 *     @OA\Response(response="200", description="User created successfully")
 * )
 */
    public function store(StoreUserRequest $request)
    {
        return $this->userService->create($request);
    }

    public function show(User $user)
    {
        return $this->userService->single($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response('', 204);
    }
}
