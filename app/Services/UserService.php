<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserCollection;
use App\Http\Requests\StoreUserRequest;

class UserService{
    public function all($request)
    {
        $users= User::query()->orderBy('id', 'desc')->paginate();
        $users->transform(function ($user) {
            $user->load($user->user_type->value);
            return $user;
        });

        return new UserCollection($users);
    }
    /**
     * Display the specified resource.
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */

    public function single(User $user)
    {


         $user->load($user->user_type->value);

        return new UserResource($user);
    }

    public function create(StoreUserRequest $request){
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }
}
