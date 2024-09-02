<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class CreditNote extends Model
{
    protected $fillable = [
        'id',
        'partner_id',
        'currency_id',
        'credit_note_status_id',
        'project_id',
        'discount_type_id',
        'number',
        'prefix',
        'number_format',
        'date',
        'admin_note',
        'client_note',
        'subtotal',
        'total_tax',
        'total',
        'adjustment',
        'added_from',
        'discount_percent',
        'discount_total',
        'deleted_customer_name',
        'reference_no',
        'billing_street',
        'billing_city',
        'billing_state',
        'billing_zip',
        'billing_country_id',
        'shipping_street',
        'shipping_city',
        'shipping_state',
        'shipping_zip',
        'shipping_country_id',
        'include_shipping',
        'show_shipping_on_credit_note',
        'show_quantity_as',
        'terms',
    ];

    protected $appends = ['pending_credits'];

    protected function pendingCredits(): Attribute
    {
        return new Attribute(
            get: fn () => $this->total - $this->credits->sum('amount')
        );
    }

    public function billingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id', 'billingCountry');
    }

    public function shippingCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id', 'shippingCountry');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(CreditNoteStatus::class, 'credit_note_status_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function discountType()
    {
        return $this->belongsTo(DiscountType::class);
    }

    public function credits()
    {
        return $this->hasMany(Credit::class);
    }

    public function lineItems(): MorphMany
    {
        return $this->morphMany(LineItem::class, 'line_itemable');
    }
}
