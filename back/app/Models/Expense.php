<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Expense extends Model
{
    protected $fillable = [
        'expense_category_id',
        'currency',
        'amount',
        'tax',
        'tax2',
        'reference_no',
        'note',
        'name',
        "partner_id",
        "project_id",
        "billable",
        "payment_mode",
        "date",
        "recurring_type",
        "repeat_every",
        "recurring",
        "cycles",
        "total_cycles",
        "custom_recurring",
        "last_recurring_date",
        "create_invoice_billable",
        "send_invoice_to_customer",
        "recurring_from",
        "date_added",
        "added_from",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
}
