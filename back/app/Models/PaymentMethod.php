<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'id',
        'name',
        'label',
        'description',
        'show_on_pdf',
        'invoices_only',
        'expenses_only',
        'selected_by_default',
        'active',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
