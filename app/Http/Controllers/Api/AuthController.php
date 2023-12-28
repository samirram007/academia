<?php

namespace App\Http\Controllers\Api;



use App\Models\User;
use App\Http\Docs\AuthDoc;
use App\Enums\UserTypeEnum;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;

/**
 * @group Authentication
 *
 * APIs for handling authentication
 */

class AuthController extends Controller
{
    protected $service;
    function __construct(AuthService $service)
    {
        $this->service=$service;

    }

    /**
     * @OA\Post(
     *      path="/api/login",
     *      tags={"Authentication"},
     *      summary="Authenticate a user",
     *      description="Authenticates a user by providing email and password.",
     *      @OA\RequestBody(
     *          required=true,
     *          description="User credentials",
     *          @OA\JsonContent(
     *              required={"email","password"},
     *              @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *              @OA\Property(property="password", type="string", example="password"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0..."),
     *              @OA\Property(property="token_type", type="string", example="bearer"),
     *              @OA\Property(property="expires_in", type="integer", example=3600),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthorized"),
     *          ),
     *      ),
     * )
     */
    public function login(LoginRequest $request){

        return $this->service->login($request);
    }
    public function signup(SignupRequest $request){
        // return $this->service->signup($request);
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'user_type' => $data['user_type'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
     public function logout(Request $request)
    {
        return $this->service->logout($request);
    }
}
