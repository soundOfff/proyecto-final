<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Estimate extends Model
{
    static $SPANISH_CLASS_NAME = "proforma";
    protected $fillable = [
        'id',
        'partner_id',
        'currency_id',
        'project_id',
        'invoice_id',
        'billing_country_id',
        'shipping_country_id',
        'estimate_status_id',
        'recurring_id',
        'discount_type_id',
        'sub_service_type_id',
        'sale_agent_id',
        'sent',
        'date_send',
        'deleted_customer_name',
        'number',
        'prefix',
        'number_format',
        'hash',
        'has_retaining_agent',
        'date',
        'expiry_date',
        'subtotal',
        'total_tax',
        'total',
        'adjustment',
        'added_from',
        'client_note',
        'admin_note',
        'discount_percent',
        'discount_total',
        'invoiced_date',
        'terms',
        'reference_no',
        'billing_street',
        'billing_city',
        'billing_state',
        'billing_zip',
        'shipping_street',
        'shipping_city',
        'shipping_state',
        'shipping_zip',
        'include_shipping',
        'show_shipping_on_estimate',
        'show_quantity_as',
        'pipeline_order',
        'is_expiry_notified',
        'acceptance_firstname',
        'acceptance_lastname',
        'acceptance_email',
        'acceptance_date',
        'acceptance_ip',
        'signature',
        'cancel_overdue_reminders',
        'created_at',
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id');
    }

    public function subServiceType(): BelongsTo
    {
        return $this->belongsTo(SubServiceType::class);
    }

    public function discountType(): BelongsTo
    {
        return $this->belongsTo(DiscountType::class);
    }

    public function saleAgent(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'sale_agent_id');
    }

    public function recurring(): BelongsTo
    {
        return $this->belongsTo(Recurring::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(EstimateStatus::class, 'estimate_status_id');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
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
