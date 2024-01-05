<?php

namespace App\Http\Controllers\Api;

use App\Enums\GenderEnum;
use App\Enums\RoomTypeEnum;
use App\Enums\UserTypeEnum;
use Illuminate\Http\Request;
use App\Enums\UserStatusEnum;
use App\Enums\AddressTypeEnum;
use App\Enums\GuardianTypeEnum;
use App\Http\Controllers\Controller;

class EnumController extends Controller
{
   public function address_type(){
    return response()->json(['data' =>AddressTypeEnum::dataLabels()]);
   }
   public function gender(){
    return response()->json(['data' =>GenderEnum::dataLabels()]);
   }
   public function guardian_type(){
    return response()->json(['data' =>GuardianTypeEnum::dataLabels()]);
   }
   public function room_type(){
    return response()->json(['data' =>RoomTypeEnum::dataLabels()]);
   }
   public function user_status(){
    return response()->json(['data' =>UserStatusEnum::dataLabels()]);
   }
   public function user_type(){
    return response()->json(['data' =>UserTypeEnum::dataLabels()]);
   }
}

