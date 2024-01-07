<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SchoolType extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable = [
        'name',
    ];

    // protected $table ='school_types';
    // protected $primaryKey = 'id';
    // public $incrementing = true;
      public $timestamps = false;
}
