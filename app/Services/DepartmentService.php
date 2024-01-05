<?php
namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\Users\UserCollection;

use App\Http\Resources\Users\UserResource;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentService{
    public function all(Request $request)
    {
        $departments= Department::query()->orderBy('id', 'desc')->paginate();


        return new DepartmentCollection($departments);
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
