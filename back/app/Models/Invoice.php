<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Invoice extends Model
{
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
        'recurring_id',
        'recurring_type',
        'sale_agent_id',
        'sent',
        'shipping_country_id',
        'shipping_city',
        'shipping_state',
        'shipping_street',
        'shipping_zip',
        'show_quantity_as',
        'show_shipping_on_invoice',
        'invoice_status_id',
        'subscription_id',
        'subtotal',
        'terms',
        'token',
        'total',
        'total_cycles',
        'total_tax',
        'created_at',
    ];

    protected $appends = ['pending_to_pay'];

    protected function pendingToPay(): Attribute
    {
        return new Attribute(
            get: fn () => $this->total - $this->credits->sum('amount') - $this->payments->sum('pivot.amount')
        );
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(InvoiceStatus::class);
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }

    public function payments(): BelongsToMany
    {
        return $this->belongsToMany(Payment::class, 'payment_invoice', 'invoice_id', 'payment_id')->withPivot('amount');
    }

    public function credits(): HasMany
    {
        return $this->hasMany(Credit::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function lineItems(): MorphMany
    {
        return $this->morphMany(LineItem::class, 'line_itemable');
    }

    public static function getNextNumber()
    {
        $lastInvoice = self::orderBy('id', 'desc')->first();
        $lastInvoiceNumber = $lastInvoice->number;
        $lastInvoiceNumber = intval($lastInvoiceNumber);
        $lastInvoiceNumber++;
        $lastInvoiceNumber = str_pad($lastInvoiceNumber, 6, '0', STR_PAD_LEFT);

        return $lastInvoiceNumber;
    }
}
