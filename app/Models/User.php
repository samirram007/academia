<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;



use App\Models\Admin;
use App\Models\Driver;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Employee;
use App\Models\Guardian;
use App\Models\Developer;
use App\Models\SuperAdmin;
use App\Enums\UserTypeEnum;
use Illuminate\Support\Str;
use App\Enums\UserStatusEnum;
use App\Models\TransportOwner;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>;
     */
    protected $fillable = [
        'name',
        'username',
        'user_type',
        'email',
        'contact_no',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>;
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>;
     */
    protected $casts = [
        'username'=>'string',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'user_type'=>UserTypeEnum::class,
        'status'=>UserStatusEnum::class,
    ];

public function addresses(){
    return $this->hasMany(Address::class);
}
    public function super_admin(){
        return $this->hasOne(SuperAdmin::class);
    }
    public function admin(){
        return $this->hasOne(Admin::class);
    }
    public function developer(){
        return $this->hasOne(Developer::class);
    }
    public function teacher(){
        return $this->hasOne(Teacher::class);
    }
    public function guardian(){
        return $this->hasOne(Guardian::class);
    }
    public function parent(){
        return $this->hasOne(Guardian::class);
    }
    public function student(){
        return $this->hasOne(Student::class);
    }
    public function employee(){
        return $this->hasOne(Employee::class);
    }
    public function transport_owner(){
        return $this->hasOne(TransportOwner::class);
    }
    public function driver(){
        return $this->hasOne(Driver::class);
    }
    protected static function boot()
    {
        parent::boot();

        // Listen for the 'creating' event to set default values before a user is created

         static::creating(function ($user) {
            $username = $user->username ?? Str::slug(static::setUnAttribute($user->attributes['name']));
            $user->attributes['username'] = $username;
            $user->attributes['user_type'] = $user->user_type ??'guest';

        });
    }


    // protected static function setUsernameAttribute($value)
    protected static function setUnAttribute($value)
    {

        // Generate a 10-character username based on the user's name
        //allow only alphabet
        $value = preg_replace('/[^a-zA-Z0-9]+/', '', $value);
        $baseUsername = strtolower(substr(str_replace(' ', '', $value), 0, 6));


            // If the username exists, append a random number to make it unique
            do {
                // Generate a random number
                $randomNumber = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
                // Append the random number to the base username
                $username = $baseUsername . $randomNumber;
                // Check if the newly generated username exists
                $count = User::where('username', $username)->count();
            } while ($count > 0); // Loop until a unique username is found

        return $username;
    }

}


