<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Api\DocumentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('api/documentation');
});
Route::get('/documents/{id}', [DocumentController::class,  'getFile']);
Route::get('/swagger',function(){
    //artisan command
     Artisan::call('l5-swagger:generate');
     return redirect('api/documentation');
});
