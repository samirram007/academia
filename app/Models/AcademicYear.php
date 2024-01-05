<?php

namespace App\Models;

use App\Models\User;
use App\Models\State;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AcademicYear extends Model
{
    use HasApiTokens,HasFactory;

    protected $fillable = [
        'campus_id',
        'year',
        'start_date',
        'end_date',
        'is_current',
        'previous_academic_year_id',
        'next_academic_year_id',
     ];
     public function campus() {
        return $this->belongsTo(Campus::class);
     }
     public function previous_academic_year() {
        return $this->belongsTo(AcademicYear::class, 'previous_academic_year_id');
     }
     public function next_academic_year() {
        return $this->belongsTo(AcademicYear::class, 'next_academic_year_id');
     }

}
