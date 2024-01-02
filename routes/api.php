<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\EnumController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/documents', [DocumentController::class,  'store']);
    Route::get('/documents/user', [DocumentController::class,  'userDocuments']);
    Route::get('/documents/{id}', [DocumentController::class,  'show']);
    Route::get('/documents/file/{id}', [DocumentController::class,  'getFile']);

    Route::apiResource('/users', UserController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/address_type', [EnumController::class,  'address_type']);
Route::get('/gender', [EnumController::class,  'gender']);
Route::get('/gurdian_type', [EnumController::class,  'gurdian_type']);
Route::get('/room_type', [EnumController::class,  'room_type']);
Route::get('/user_status', [EnumController::class,  'user_status']);
Route::get('/user_type', [EnumController::class,  'user_type']);
});



Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

