<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Developer extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable=['id','user_id','name'];
    protected $attributes = [
        'id' => '1',
        'name' => 'Developer',
    ];
}
