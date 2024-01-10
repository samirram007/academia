<?php
namespace App\Services;

use App\Models\User;
use App\Models\Student;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Users\UserResource;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\Users\UserCollection;

class UserService{
    public function all(Request $request)
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
        //db transaction
        //   dd($request->all());
        DB::transaction(function() use ($request) {

            $data = $request->validated();
            //dd($data);
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);
            if($user!=null && $user->user_type->value=='student'){
                Student::create([
                    "user_id"=>$user["id"],
                    "name"=>$user["name"],
                    "email"=>$user["email"],
                    "contact_no"=>$user["contact_no"],
                    "gender"=>$user["gender"],
                    ]);
            }
            return response(new UserResource($user), 201);
        });


    }
}
