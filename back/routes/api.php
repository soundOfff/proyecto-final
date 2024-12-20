<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\ActionTypeController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DiscountTypeController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\EstimateStatusController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseRepeatController;
use App\Http\Controllers\FcmController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemGroupController;
use App\Http\Controllers\JurisdictionController;
use App\Http\Controllers\LineItemTypeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MailTemplateController;
use App\Http\Controllers\MailTemplateGroupController;
use App\Http\Controllers\MailTemplateLanguageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationPriorityController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PartnerIndustryController;
use App\Http\Controllers\PartnerProjectRoleController;
use App\Http\Controllers\PartnerSectionController;
use App\Http\Controllers\PartnerTypeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\ProcedureStatusController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProjectBillingTypeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectNoteController;
use App\Http\Controllers\ProjectServiceTypeController;
use App\Http\Controllers\ProjectStatusController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProposalStatusController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\RecurringController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SubServiceTypeController;
use App\Http\Controllers\TableFieldController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskPriorityController;
use App\Http\Controllers\TaskRepeatController;
use App\Http\Controllers\TaskStatusController;
use App\Http\Controllers\TaskTimerController;
use App\Http\Controllers\TaxController;
use App\Models\NotificationPriority;
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
Route::get('/projects-select/{partner}', [ProjectController::class, 'select']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{project}', [ProjectController::class, 'update']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/projects-data/{project}', [ProjectController::class, 'getProjectFinancialData']);
Route::put('/project-members/{project}', [ProjectController::class, 'updateMembers']);

Route::post('/projects/{project}/tasks-attach', [ProjectController::class, 'attachTasks']);

Route::get('/projects/counts/status', [ProjectController::class, 'countByStatuses']);

Route::get('/project-statuses', [ProjectStatusController::class, 'index']);
Route::get('/project-statuses/{projectStatus}', [ProjectStatusController::class, 'show']);

Route::get('/currencies', [CurrencyController::class, 'index']);
Route::get('/default-currency', [CurrencyController::class, 'defaultCurrency']);

Route::get('/payment-methods', [PaymentMethodController::class, 'index']);

Route::get('/taxes', [TaxController::class, 'index']);

Route::get('/groups', [ItemGroupController::class, 'index']);
Route::post('/groups', [ItemGroupController::class, 'store']);

Route::get('/line-item-types', [LineItemTypeController::class, 'index']);

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);

Route::get('/partners', [PartnerController::class, 'index']);
Route::post('/partners', [PartnerController::class, 'store']);
Route::get('/partners/{partner}', [PartnerController::class, 'show']);
Route::put('/partners/{partner}', [PartnerController::class, 'update']);
Route::get('/partner-stats', [PartnerController::class, 'stats']);
Route::get('/partners-select', [PartnerController::class, 'select']);

Route::get('/partner-types', [PartnerTypeController::class, 'index']);

Route::get('/partner-project-roles', [PartnerProjectRoleController::class, 'index']);

Route::get('/expense-categories', [ExpenseCategoryController::class, 'index']);

Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::put('/expenses/{expense}', [ExpenseController::class, 'update']);
Route::get('/expenses/{expense}', [ExpenseController::class, 'show']);
Route::get('/expense-repeats', [ExpenseRepeatController::class, 'index']);
Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy']);

Route::get('/estimate-statuses', [EstimateStatusController::class, 'index']);

Route::get('/estimates-max-id', [EstimateController::class, 'maxId']);
Route::get('/estimates', [EstimateController::class, 'index']);
Route::post('/estimates', [EstimateController::class, 'store']);
Route::put('/estimates/{estimate}', [EstimateController::class, 'update']);
Route::get('/estimates/{estimate}', [EstimateController::class, 'show']);
Route::delete('/estimates/{estimate}', [EstimateController::class, 'destroy']);
Route::get('/estimates-to-invoice/{estimate}', [EstimateController::class, 'toInvoice']);

Route::get('/proposals-select', [ProposalController::class, 'select']);
Route::get('/proposals', [ProposalController::class, 'index']);
Route::post('/proposals', [ProposalController::class, 'store']);
Route::put('/proposals/{proposal}', [ProposalController::class, 'update']);
Route::get('/proposals/{proposal}', [ProposalController::class, 'show']);
Route::delete('/proposals/{proposal}', [ProposalController::class, 'destroy']);
Route::get('/proposal-statuses', [ProposalStatusController::class, 'index']);

Route::get('/proposal-to-project/{proposal}', [ProposalController::class, 'toProject']);

Route::get('/tasks-priorities', [TaskPriorityController::class, 'select']);
Route::get('/tasks-status', [TaskStatusController::class, 'index']);

Route::put('/timers/{timer}', [TaskTimerController::class, 'update']);
Route::post('/timers', [TaskTimerController::class, 'store']);
Route::get('/current-timer/{staff}', [TaskTimerController::class, 'getCurrentTimer']);

Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/tasks-select', [TaskController::class, 'select']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{task}', [TaskController::class, 'update']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
Route::post('/tasks-delete-many', [TaskController::class, 'destroyMany']);
Route::get('/task-stats', [TaskController::class, 'stats']);
Route::post('/tasks-edit-steps', [TaskController::class, 'editSteps']);

Route::get('/tasks/counts/status', [TaskController::class, 'countByStatuses']);

Route::get('/task-repeats', [TaskRepeatController::class, 'index']);

Route::get('/tags', [TagController::class, 'index']);

Route::get('/countries-select', [CountryController::class, 'select']);
Route::get('/provinces', [ProvinceController::class, 'index']);
Route::get('/districts', [DistrictController::class, 'index']);
Route::get('/jurisdictions', [JurisdictionController::class, 'index']);

Route::get('/invoices', [InvoiceController::class, 'index']);
Route::get('/invoices-select', [InvoiceController::class, 'select']);
Route::get('/invoices/{invoice}', [InvoiceController::class, 'show']);

Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contact-stats', [ContactController::class, 'stats']);

Route::get('/staffs-select', [StaffController::class, 'select']);
Route::get('/staffs', [StaffController::class, 'index']);
Route::get('/staffs/{staff}', [StaffController::class, 'getUser']);
Route::put('/staffs/{staff}', [StaffController::class, 'update']);
Route::post('/staffs', [StaffController::class, 'store']);
Route::delete('/staffs/{staff}', [StaffController::class, 'destroy']);
Route::get('/staffs-stats/{staff}', [StaffController::class, 'stats']);

Route::get('/discount-types', [DiscountTypeController::class, 'index']);

Route::get('/sub-service-types', [SubServiceTypeController::class, 'index']);

Route::get('/recurrings', [RecurringController::class, 'index']);

Route::get('/files', [FileController::class, 'index']);
Route::get('/files/{file}', [FileController::class, 'show']);
Route::delete('/files/{file}', [FileController::class, 'destroy']);
Route::post('/files', [FileController::class, 'store']);
Route::post('/files-store-many', [FileController::class, 'storeMany']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::get('/permissions', [PermissionController::class, 'index']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::delete('/payments/{payment}', [PaymentController::class, 'destroy']);

Route::post('/partial-payments-attach', [PaymentController::class, 'attach']);
Route::post('/partial-payments-detach', [PaymentController::class, 'detach']);

Route::get('/credit-notes', [CreditNoteController::class, 'index']);
Route::post('/credit-notes', [CreditNoteController::class, 'store']);
Route::get('/credit-notes/{creditNote}', [CreditNoteController::class, 'show']);
Route::put('/credit-notes/{creditNote}', [CreditNoteController::class, 'update']);
Route::delete('/credit-notes/{creditNote}', [CreditNoteController::class, 'destroy']);

Route::post('/credits', [CreditController::class, 'attach']);

Route::get('/credits', [CreditController::class, 'index']);
Route::post('/credits', [CreditController::class, 'attach']);
Route::delete('/credits/{credit}', [CreditController::class, 'destroy']);

Route::get('/processes', [ProcessController::class, 'index']);
Route::post('/processes', [ProcessController::class, 'store']);
Route::get('/processes/{process}', [ProcessController::class, 'show']);
Route::put('/processes/{process}', [ProcessController::class, 'update']);
Route::delete('/processes/{process}', [ProcessController::class, 'destroy']);

Route::get('/procedures', [ProcedureController::class, 'index']);
Route::get('/procedures/{procedure}', [ProcedureController::class, 'show']);
Route::post('/procedures', [ProcedureController::class, 'store']);
Route::put('/procedures/{procedure}', [ProcedureController::class, 'update']);
Route::delete('/procedures/{procedure}', [ProcedureController::class, 'destroy']);
Route::post('/procedures-edit-steps', [ProcedureController::class, 'editSteps']);

Route::get('/procedure-statuses', [ProcedureStatusController::class, 'index']);

Route::get('/actions', [ActionController::class, 'index']);
Route::get('/action-types', [ActionTypeController::class, 'index']);

Route::post('/table-fields', TableFieldController::class);

Route::get('/activity-logs', [ActivityController::class, 'index']);

Route::post('/send-notification', [FcmController::class, 'sendNotification']);
Route::post('/store-token', [FcmController::class, 'storeToken']);

Route::get('/mail-templates', [MailTemplateController::class, 'index']);
Route::get('/mail-templates/{mailTemplate}', [MailTemplateController::class, 'show']);
Route::put('/mail-templates/{mailTemplate}', [MailTemplateController::class, 'update']);

Route::get('/mail-templates-languages', [MailTemplateLanguageController::class, 'index']);

Route::get('/mail-template-groups', [MailTemplateGroupController::class, 'index']);

Route::get('/documents', [DocumentController::class, 'generate']);

Route::post('/mail-templates-send', [MailTemplateController::class, 'send']);
Route::post('/mail-templates-allowed-fields', [MailTemplateController::class, 'allowedFields']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);
Route::post('/notifications/is-not-seen-count', [NotificationController::class, 'isNotSeenCount']);
Route::put('/notifications-update-many', [NotificationController::class, 'updateMany']);
Route::put('/notifications-archive-many', [NotificationController::class, 'archiveMany']);

Route::get('/notification-priorities', [NotificationPriorityController::class, 'select']);

Route::get('/partner-industries', [PartnerIndustryController::class, 'index']);

Route::get('/partner-sections', [PartnerSectionController::class, 'index']);

Route::get('/generate-pdf', [PDFController::class, 'generatePDF']);

Route::middleware('auth:sanctum')->get('/staff', function (Request $request) {
    return $request->user();
});
