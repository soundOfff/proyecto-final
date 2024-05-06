<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Expense extends Model
{
    public const CUSTOM_RECURRING_TYPES = [
        1 => 1,
        2 => 7,
        3 => 30,
        4 => 365,
    ];

    protected $fillable = [
        'expense_category_id',
        'estimate_id',
        'currency_id',
        'amount',
        'tax_id',
        'tax2_id',
        'reference_no',
        'note',
        'name',
        'partner_id',
        'project_id',
        'billable',
        'payment_method_id',
        'date',
        'invoice_id',
        'recurring_type',
        'repeat_id',
        'recurring',
        'cycles',
        'total_cycles',
        'custom_recurring',
        'last_recurring_date',
        'is_infinite',
        'create_invoice_billable',
        'send_invoice_to_customer',
        'recurring_from',
        'date_added',
        'added_from',
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function tax1(): BelongsTo
    {
        return $this->belongsTo(Tax::class);
    }

    public function tax2(): BelongsTo
    {
        return $this->belongsTo(Tax::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
