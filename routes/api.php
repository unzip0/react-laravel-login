<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ApiController;
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

Route::post('user/register', [RegisterController::class, 'store']);
Route::post('user/login', [LoginController::class, 'login']);
Route::get('user/get', [ApiController::class, 'getUsers']);
Route::get('user/get/{id}', [ApiController::class, 'getUserById'])->where('id', '[0-9]+');
Route::get('user/get/{username}', [ApiController::class, 'getUserByUsername'])->where('username', '[a-z]+');
