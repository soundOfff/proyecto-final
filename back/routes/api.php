<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/hello-world', function () {
    return response()->json('Hello World');
});

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/project-statuses', [ProjectStatusController::class, 'index']);
Route::get('/project-statuses/{projectStatus}', [ProjectStatusController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
