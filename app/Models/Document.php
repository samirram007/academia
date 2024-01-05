<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable = [
        'name',
        'user_id',
        'document_type',
        'path',
        'mime_type',
        'size',
        'original_name',
    ];
}
