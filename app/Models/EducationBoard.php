<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationBoard extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'code',
        'address_id',
        'description',
        'contact_no',
        'email',
        'website',
        'establishment_date',
        'logo_image',
    ];
}
