<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Str;
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
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function details(){
        return $this->morphOne(UserDetail::class, 'userable');
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    protected static function boot()
    {
        parent::boot();

        // Listen for the 'creating' event to set default values before a user is created
        static::creating(function ($user) {
            $username = $user->username ?? Str::slug(static::setUsernameAttribute($user->attributes['name']));
            $user->attributes['username'] = $username;
            $user->attributes['user_type'] = $user->user_type ??'guest';

        });
    }


    protected static function setUsernameAttribute($value)
    {

        // Generate a 10-character username based on the user's name
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


