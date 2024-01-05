<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class School extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable = [
        'name',
        'username',
        'user_type',
        'email',
        'contact_no',
        'password',
    ];
}
