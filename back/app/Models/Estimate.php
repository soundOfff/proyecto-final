<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Estimate extends Model
{
    protected $fillable = [
        'id',
        'partner_id',
        'currency_id',
        'project_id',
        'invoice_id',
        'billing_country_id',
        'shipping_country_id',
        'sent',
        'date_send',
        'deleted_customer_name',
        'number',
        'prefix',
        'number_format',
        'hash',
        'date',
        'expiry_date',
        'subtotal',
        'total_tax',
        'total',
        'adjustment',
        'added_from',
        'status',
        'client_note',
        'admin_note',
        'discount_percent',
        'discount_total',
        'discount_type',
        'invoiced_date',
        'terms',
        'reference_no',
        'sale_agent',
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
        'recurring',
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
}
