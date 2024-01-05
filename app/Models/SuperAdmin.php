<?php

namespace App\Models;

use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SuperAdmin extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable=['user_id','name'];
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
