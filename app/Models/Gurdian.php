<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gurdian extends Model
{
    use HasFactory;
    use HasFactory;
    protected $fillable=['id','user_id','name'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
