<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_status_id',
        'law_firm_id',
        'jurisdiction_id',
        'project_billing_type_id',
        'project_service_type_id',
        'responsible_person_id',
        'added_from',
        'date_finished',
        'deadline',
        'description',
        'estimated_hours',
        'expedient',
        'name',
        'progress',
        'progress_from_tasks',
        'cost',
        'created',
        'rate_per_hour',
        'start_date',
        'amount',
        'jury_number',
        'on_schedule',
        'proposal_id',
        'billable_partner_id',
        'process_id',
        'type',
    ];

    public function stages(): HasMany
    {
        return $this->hasMany(ProjectStage::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ProjectNote::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProjectStatus::class, 'project_status_id');
    }

    public function billablePartner(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'billable_partner_id');
    }

    public function jurisdiction(): BelongsTo
    {
        return $this->belongsTo(Jurisdiction::class);
    }

    public function responsiblePerson(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'responsible_person_id');
    }

    public function lawFirm(): BelongsTo
    {
        return $this->belongsTo(LawFirm::class);
    }

    public function serviceType(): BelongsTo
    {
        return $this->belongsTo(ProjectServiceType::class, 'project_service_type_id');
    }

    public function billingType(): BelongsTo
    {
        return $this->belongsTo(ProjectBillingType::class, 'project_billing_type_id');
    }

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function process(): BelongsTo
    {
        return $this->belongsTo(Process::class);
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'project_members');
    }

    public function staffs(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'project_staff');
    }

    public function partners(): BelongsToMany
    {
        return $this->belongsToMany(Partner::class, 'partner_project')->using(PartnerProject::class)->withPivot('role_id', 'owner_id');
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function tasks(): MorphMany
    {
        return $this->morphMany(Task::class, 'taskable');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            $query->where('name', 'like', "%$search%");
        });
    }

    public function setName(): void
    {
        $department = $this->serviceType->label;
        $process = $this->process ? ', '.$this->process->name : '';
        $defendants = $this->partners->where('pivot.role_id', PartnerProjectRole::DEFENDANT);
        $plaintiffs = $this->partners->where('pivot.role_id', PartnerProjectRole::PLAINTIFF);

        $name = $department.$process.' | '.$plaintiffs->implode('merged_name', ', ').' vs '.$defendants->implode('merged_name', ', ');

        $this->update([
            'name' => $name,
        ]);
    }
    public function estimates(): HasMany
    {
        return $this->hasMany(Estimate::class, 'project_id');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'project_id');
    }
    public function expensesCost()
    {
        return $this->expenses()->whereNull('invoice_id')->sum('amount');
    }
    public function estimatesCost()
    {
        return $this->estimates()->sum('subtotal');
    }

    public function totalBilledCost($from = null, $until = null){

        $from = $from ?? now()->subYear(2)->startOfYear();
        $until = $until ?? now();

        return $this->estimates()
        ->whereNotNull('invoice_id')
        ->join('invoices', 'invoices.id','=', 'estimates.invoice_id')
        ->whereDate('invoices.date','<=',$until)
        ->whereDate('invoices.date','>=',$from)
        ->sum('estimates.total');
    }

    public function totalBilledCostPerMonth($from = null, $until = null){

        $from = $from ?? now()->subYear(10)->startOfYear();
        $until = $until ?? now();

        return $this->estimates()
        ->whereNotNull('invoice_id')
        ->join('invoices', 'estimates.invoice_id', '=', 'invoices.id')
        ->whereBetween('invoices.date', [$from, $until])
        ->selectRaw("DATE_FORMAT(invoices.date, '%m-%y') as month, SUM(estimates.total) as total")
        ->groupBy('month')
        ->orderByRaw("STR_TO_DATE(CONCAT('01-', month), '%d-%m-%y')")
        ->get();
    }


    public function subTotalbilledCost(){
        return $this->estimates()
        ->whereNotNull('invoice_id')
        ->get()
        ->sum(function($estimate){
            return ($estimate->getExpenseCost() + $estimate->getOtherCost());
        });
    }
    public function tasksCost(){
        return $this->tasks()
        ->get()
        ->sum(function ($task) {
            return $task->calculateCost();
        });
    }
    public function subTotalCost()
    {
        return $this->estimatesCost() + $this->expensesCost() + $this->tasksCost();
    }

    public function totalPaid($from = null, $until = null){

        $from = $from ?? now()->subYear(2)->startOfYear();
        $until = $until ?? now();

        return $this->estimates()
        ->join('invoices','estimates.invoice_id','=','invoices.id')
        ->join('payment_invoice', 'payment_invoice.invoice_id', '=', 'invoices.id')
        ->whereDate('payment_invoice.created_at','<=',$until)
        ->whereDate('payment_invoice.created_at','>=',$from)
        ->sum('payment_invoice.amount');
    }

    public function totalPaidCostPerMonth($from = null, $until = null){

        $from = $from ?? now()->subYear(2)->startOfYear();
        $until = $until ?? now();

        return $this->estimates()
        ->whereNotNull('estimates.invoice_id')
        ->join('payment_invoice', 'payment_invoice.invoice_id', '=', 'estimates.invoice_id')
        ->whereBetween('payment_invoice.created_at', [$from, $until])
        ->selectRaw("DATE_FORMAT(payment_invoice.created_at, '%m-%y') as month, SUM(payment_invoice.amount) as total")
        ->groupBy('month')
        ->orderByRaw("STR_TO_DATE(CONCAT('01-', month), '%d-%m-%y')")
        ->get();
    }
}
