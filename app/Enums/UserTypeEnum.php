<?php
namespace App\Enums;


enum UserTypeEnum:string
{
    case ADMIN = 'admin';
    case SUPERADMIN = 'superadmin';
    case STUDENT = 'student';
    case TEACHER = 'teacher';
}
