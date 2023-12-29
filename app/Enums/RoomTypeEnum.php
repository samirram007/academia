<?php
namespace App\Enums;


enum RoomTypeEnum:string
{

    case CLASSROOM = "Classroom";
    case SCIENCE_LAB = "science_lab";
    case COMPUTER_LAB = "computer_lab";
    case GYMNASIUM = "gymnasium";
    case AUDITORIUM = "auditorium";
    case ART_ROOM = "art_room";
    case MUSIC_ROOM = "music_room";
    case CAFETERIA = "cafeteria";
    case ADMIN_OFFICE = "admin_office";
    case LIBRARY = "library";
    case WASHROOM = "washroom";
    case SPECIAL_EDUCATION_ROOM = "special_education_room";
    case RESOURCE_ROOM = "resource_room";


    public function label(): string
    {
        return match($this){
            self::CLASSROOM => 'Classroom',
            self::SCIENCE_LAB => 'Science Lab',
            self::COMPUTER_LAB => 'Computer Lab',
            self::GYMNASIUM => 'Gymnasium',
            self::AUDITORIUM => 'Auditorium',
            self::ART_ROOM => 'Art Room',
            self::MUSIC_ROOM => 'Music Room',
            self::CAFETERIA => 'Cafeteria',
            self::ADMIN_OFFICE => 'Office Room',
            self::LIBRARY => 'Library',
            self::WASHROOM => 'Washroom',
            self::SPECIAL_EDUCATION_ROOM => 'Special Education Room',
            self::RESOURCE_ROOM => 'Resource Room',
        };
    }
    public static function default(): string
    {
        return  RoomTypeEnum::CLASSROOM->value;
    }
    public static function labels():array
    {
        return array_reduce(self::cases(),function($items, RoomTypeEnum $item){
            $items[$item->value] = $item->label();
            return $items;
        },[]);
    }
}

