<?php
namespace App\Enums;


enum UserTypeEnum:string
{
    case ADMIN = 'admin';
    case DEVELOPER = 'developer';
    case SUPER_ADMIN = 'super_admin';
    case STUDENT = 'student';
    case GURDIAN = 'gurdian';
    case TEACHER = 'teacher';
    case EMPLOYEE = 'employee';
    case TRANSPORT_OWNER = 'transport_owner';
    case DRIVER = 'driver';
    case MANAGER ='manager';
    case PARENT = 'parent';
    case FACULTY = 'faculty';

    public function label(): string
    {
        return match($this){
            self::ADMIN => 'Admin',
            self::DEVELOPER => 'Developer',
            self::SUPER_ADMIN => 'Super Admin',
            self::STUDENT => 'Student',
            self::GURDIAN => 'Gurdian',
            self::TEACHER => 'Teacher',
            self::EMPLOYEE => 'Employee',
            self::TRANSPORT_OWNER => 'Transport Owner',
            self::DRIVER => 'Driver',
            self::MANAGER => 'Manager',
            self::PARENT => 'Parent',
            self::FACULTY => 'Faculty',
        };
    }
    public static function default(): string
    {
        return  UserTypeEnum::STUDENT->value;
    }
    public static function labels():array
    {
        return array_reduce(self::cases(),function($items, UserTypeEnum $item){
            $items[$item->value] = $item->label();
            return $items;
        },[]);
    }
}
enum GurdianType:string
{
    case FATHER = 'father';
    case MOTHER = 'mother';
    case BROTHER = 'brother';
}
enum AddressType:string
{
    case PARMENENT = 'parmanent';
    case CURRENT = 'current';
}
