<?php

namespace App\Models;

use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable=['user_id','name'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function guardians()
    {
        return $this->belongsToMany(Guardian::class)->withTimestamps();
    }
}
