<?php

use App\Http\Controllers\Api\GuardianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnumController;
use App\Http\Controllers\Api\TermController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\CampusController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\BuildingController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\StandardController;
use App\Http\Controllers\Api\DeveloperController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\DesignationController;

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
    Route::apiResource('/schools', SchoolController::class);
    Route::apiResource('/campuses', CampusController::class);
    Route::apiResource('/departments', DepartmentController::class);
    Route::apiResource('/designations', DesignationController::class);
    Route::apiResource('/addresses', AddressController::class);
    Route::apiResource('/admins', AdminController::class);
    Route::apiResource('/developers', DeveloperController::class);
    Route::apiResource('/teachers', TeacherController::class);
    Route::apiResource('/employees', EmployeeController::class);
    Route::apiResource('/gurdians', GuardianController::class);
    Route::apiResource('/students', StudentController::class);
    Route::apiResource('/drivers', DriverController::class);
    Route::apiResource('/boards', BoardController::class);
    Route::apiResource('/buildings', BuildingController::class);
    Route::apiResource('/countries', CountryController::class);
    Route::apiResource('/states', StateController::class);
    Route::apiResource('/standards', StandardController::class);
    Route::apiResource('/sections', SectionController::class);
    Route::apiResource('/terms', TermController::class);




    Route::post('/logout', [AuthController::class, 'logout']);

    //Enums
    Route::get('/address_type', [EnumController::class,  'address_type']);
    Route::get('/gender', [EnumController::class,  'gender']);
    Route::get('/gurdian_type', [EnumController::class,  'gurdian_type']);
    Route::get('/room_type', [EnumController::class,  'room_type']);
    Route::get('/user_status', [EnumController::class,  'user_status']);
    Route::get('/user_type', [EnumController::class,  'user_type']);
});



Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

