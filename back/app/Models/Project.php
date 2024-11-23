<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_status_id',
        'law_firm_id',
        'jurisdiction_id',
        'demand_amount',
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
        'document_url',
        'billable_partner_id',
        'process_id',
        'type',
        'court_id',
    ];

    public static $generateRules = [
        'process' => 'required',
        'demand_amount' => 'required',
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

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
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

    public function defendants(): BelongsToMany
    {
        return $this->partners()->wherePivot('role_id', PartnerProjectRole::DEFENDANT);
    }

    public function plaintiffs(): BelongsToMany
    {
        return $this->partners()->wherePivot('role_id', PartnerProjectRole::PLAINTIFF);
    }

    public function responsiblePerson(): BelongsToMany
    {
        return $this->partners()->wherePivot('role_id', PartnerProjectRole::RESPONSIBLE_PERSON);
    }

    public function guarantor(): BelongsToMany
    {
        return $this->partners()->wherePivot('role_id', PartnerProjectRole::GUARANTOR);
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

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        $startDate = $this->start_date ? Carbon::parse($this->start_date)->format('Y-m-d') : '-';
        $deadline = $this->deadline ? Carbon::parse($this->deadline)->format('Y-m-d') : '-';
        $createdAt = Carbon::parse($this->created_at)->format('Y-m-d H:i:s');
        $billablePartnerName = $this->billablePartner ? $this->billablePartner->merged_name : '-';
        $billingType = $this->billingType ? $this->billingType->label : '-';
        $estimatedHours = $this->estimated_hours ? $this->estimated_hours : '-';
        $courtName = $this->court ? $this->court->name : '-';
        $department = $this->serviceType ? $this->serviceType->label : '-';
        $process = $this->process ? $this->process->name : '-';
        $responsiblePersonName = $this->responsiblePerson ? $this->responsiblePerson->name : '-';
        $members = $this->members ? $this->members->implode('name', ', ') : '-';
        $relatedPersons = $this->partners ? $this->partners->implode('mergedName', " \n ") : '-';

        $block->text("*Nombre:* $this->name\n*Descripción:* $this->description\n*Cliente Facturable:* $billablePartnerName\n*Miembros:* $members\n\n*Personas Relacionadas:*\n $relatedPersons\n\n *Persona Responsable:* $responsiblePersonName\n")->markdown();
        $block->field("*Fecha de inicio:* $startDate")->markdown();
        $block->field("*Fecha de finalización:* $deadline")->markdown();
        $block->field("*Tipo de facturación:* $billingType")->markdown();
        $block->field("*Horas Estimadas:* $estimatedHours")->markdown();
        $block->field("*Juzgado:* $courtName")->markdown();
        $block->field("*Departamento:* $department")->markdown();
        $block->field("*Proceso:* $process")->markdown();
        $block->field("*Tipo:* $this->type")->markdown();
        $block->field("*Monto de la demanda:* $this->demand_amount")->markdown();
        $block->field("*Creado el:* $createdAt")->markdown();
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

    public function billedCost(){
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
    public function totalCost()
    {
        return $this->estimatesCost() + $this->expensesCost() + $this->tasksCost();
    }

}
