<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_status_id',
        'defendant_id',
        'plaintiff_id',
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

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function jurisdiction(): BelongsTo
    {
        return $this->belongsTo(Jurisdiction::class);
    }

    public function defendant(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'defendant_id');
    }

    public function plaintiff(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'plaintiff_id');
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
        return $this->belongsToMany(Partner::class, 'partner_project')->withPivot('role');
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
}
