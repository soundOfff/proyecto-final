<?php

use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProjectBillingTypeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectServiceTypeController;
use App\Http\Controllers\ProjectStatusController;
use App\Http\Controllers\StaffController;
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

Route::get('/project-service-types', [ProjectServiceTypeController::class, 'index']);
Route::get('/project-billing-types', [ProjectBillingTypeController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/projects/counts/status', [ProjectController::class, 'countByStatuses']);

Route::get('/project-statuses', [ProjectStatusController::class, 'index']);
Route::get('/project-statuses/{projectStatus}', [ProjectStatusController::class, 'show']);

Route::get('/partners/select', [PartnerController::class, 'select']);
Route::get('/staffs/select', [StaffController::class, 'select']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
