<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransportOwner extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable = [
        'user_id',
        'name',
    ];
}
