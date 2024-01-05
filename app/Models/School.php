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
        'code',
        'education_board_id',
        'address_id',
        'description',
        'contact_no',
        'email',
        'website',
        'establishment_date',
        'logo_image',


    ];
}
