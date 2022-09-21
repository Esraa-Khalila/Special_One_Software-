<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ContractController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::apiResource('/customer',CustomerController::class);
// Route::apiResource('/contract',ContractController::class);
Route::get('/contract',[ContractController::class ,'index']);
Route::post('/contract',[ContractController::class ,'store']);
Route::get('/search/{key}',[ContractController::class ,'search']);
Route::get('/date',[ContractController::class ,'date']);
Route::get('/all/{key}',[ContractController::class ,'customer_contract']);
Route::get('/all',[ContractController::class ,'customer_contractt']);
Route::get('/customer', [CustomerController::class, 'index']);
Route::post('/customer', [CustomerController::class, 'store']);
Route::get('/search/{key}', [CustomerController::class, 'search']);
