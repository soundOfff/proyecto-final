<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseRepeatController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemGroupController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProjectBillingTypeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectNoteController;
use App\Http\Controllers\ProjectServiceTypeController;
use App\Http\Controllers\ProjectStatusController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaxController;
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

Route::get('/project-service-types', [ProjectServiceTypeController::class, 'index']);
Route::get('/project-billing-types', [ProjectBillingTypeController::class, 'index']);

Route::post('/project-notes/{project}', [ProjectNoteController::class, 'attach']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects-select/{defendant}', [ProjectController::class, 'select']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/projects/counts/status', [ProjectController::class, 'countByStatuses']);

Route::get('/project-statuses', [ProjectStatusController::class, 'index']);
Route::get('/project-statuses/{projectStatus}', [ProjectStatusController::class, 'show']);

Route::get('/currencies', [CurrencyController::class, 'index']);
Route::get('/default-currency', [CurrencyController::class, 'defaultCurrency']);

Route::get('/payment-methods', [PaymentMethodController::class, 'index']);

Route::get('/taxes', [TaxController::class, 'index']);

Route::get('/groups', [ItemGroupController::class, 'index']);
Route::post('/groups', [ItemGroupController::class, 'store']);

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);

Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/partners/{partner}', [PartnerController::class, 'show']);
Route::put('/partners/{partner}', [PartnerController::class, 'update']);
Route::get('/partner-stats', [PartnerController::class, 'stats']);
Route::get('/partners-select', [PartnerController::class, 'select']);

Route::get('/expense-categories', [ExpenseCategoryController::class, 'index']);

Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::get('/expenses/{expense}', [ExpenseController::class, 'show']);
Route::get('/expense-repeats', [ExpenseRepeatController::class, 'index']);

Route::get('/estimates', [EstimateController::class, 'index']);
Route::get('/estimates-max-id', [EstimateController::class, 'maxId']);
Route::get('/estimates/{estimate}', [EstimateController::class, 'show']);
Route::post('/estimates', [EstimateController::class, 'store']);

Route::get('/tags', [TagController::class, 'index']);

Route::get('/countries-select', [CountryController::class, 'select']);

Route::get('/invoices-select', [InvoiceController::class, 'select']);

Route::get('/contact-stats', [ContactController::class, 'stats']);

Route::get('/staffs-select', [StaffController::class, 'select']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
