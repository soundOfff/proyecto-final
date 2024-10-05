<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Proposal extends Model
{
    static $SPANISH_CLASS_NAME = "proforma";
    
    protected $fillable = [
        'id',
        'estimate_id',
        'invoice_id',
        'currency_id',
        'country_id',
        'contact_id',
        'proposal_status_id',
        'staff_assigned_id',
        'proposable_id',
        'proposable_type',
        'acceptance_date',
        'acceptance_email',
        'acceptance_first_name',
        'acceptance_last_name',
        'acceptance_ip',
        'added_from',
        'address',
        'adjustment',
        'allow_comments',
        'assigned',
        'city',
        'content',
        'date',
        'date_converted',
        'date_send',
        'discount_percent',
        'discount_total',
        'discount_type_id',
        'email',
        'hash',
        'is_expiry_notified',
        'open_till',
        'phone',
        'pipeline_order',
        'proposal_to',
        'show_quantity_as',
        'signature',
        'state',
        'subject',
        'subtotal',
        'total',
        'total_tax',
        'zip',
        'created_at',
    ];

    public const PROPOSABLE_CUSTOMER = "customer";

    public function proposable(): MorphTo
    {
        return $this->morphTo();
    }

    public function staffAssigned(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'staff_assigned_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProposalStatus::class, 'proposal_status_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function discountType(): BelongsTo
    {
        return $this->belongsTo(DiscountType::class);
    }

    public function saleAgent(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'sale_agent_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ProposalComment::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function lineItems(): MorphMany
    {
        return $this->morphMany(LineItem::class, 'line_itemable');
    }
}
