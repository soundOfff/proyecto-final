<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Payment extends Model
{
    protected $fillable = [
        'id',
        'invoice_id',
        'partner_id',
        'payment_method_id',
        'amount',
        'expenses_amount',
        'date',
        'date_recorded',
        'note',
        'payment_mode',
        'transaction_id',
    ];

    protected $appends = ['partial_total_paid'];

    protected function partialTotalPaid(): Attribute
    {
        return new Attribute(
            get: fn () => $this->amount - $this->invoices->sum('pivot.amount')
        );
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function invoices(): BelongsToMany
    {
        return $this->belongsToMany(Invoice::class, 'payment_invoice', 'payment_id', 'invoice_id')->withPivot('amount');
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query
                ->join('partners as p', 'p.id', '=', 'payments.partner_id')
                ->where('p.company', 'like', "%$search%")
                ->orWhere('p.name', 'like', "%$search%");
        });
    }
}
