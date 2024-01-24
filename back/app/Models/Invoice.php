<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'added_from',
        'adjustment',
        'admin_note',
        'allowed_payment_modes',
        'billing_country_id',
        'billing_city',
        'billing_state',
        'billing_street',
        'billing_zip',
        'cancel_overdue_reminders',
        'client_note',
        'currency_id',
        'custom_recurring',
        'cycles',
        'date',
        'date_send',
        'date_created',
        'deleted_customer_name',
        'discount_percent',
        'discount_total',
        'discount_type',
        'due_date',
        'estimate_id',
        'hash',
        'include_shipping',
        'is_recurring_from',
        'last_overdue_reminder',
        'last_recurring_date',
        'number',
        'number_format',
        'prefix',
        'partner_id',
        'project_id',
        'recurring',
        'recurring_type',
        'sale_agent',
        'sent',
        'shipping_country_id',
        'shipping_city',
        'shipping_state',
        'shipping_street',
        'shipping_zip',
        'show_quantity_as',
        'show_shipping_on_invoice',
        'status',
        'subscription_id',
        'subtotal',
        'terms',
        'token',
        'total',
        'total_cycles',
        'total_tax',
        'created_at',
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }
}
