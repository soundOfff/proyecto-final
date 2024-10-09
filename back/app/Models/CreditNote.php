<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;

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

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        $number = $this->number ?: '-';
        $statusName = $this->status ? $this->status->label : '-';
        $partnerName = $this->partner ? $this->partner->merged_name : '-';
        $partnerBillingStreet = $this->partner ? $this->partner->billing_street ?? '-' : '-';
        $partnerBillingCity = $this->partner ? $this->partner->billing_city ?? '-' : '-';
        $partnerBillingState = $this->partner ? $this->partner->billing_state ?? '-' : '-';
        $partnerBillingCountry = $this->partner ? ($this->partner->billingCountry ? $this->partner->billingCountry->name : '-') : '-';
        $partnerPhoneNumber = $this->partner ? $this->partner->phone_number ?? '-' : '-';
        $date = $this->date ? Carbon::parse($this->date)->format('Y-m-d') : '-';
        $projectName = $this->project ? $this->project->name : '-';
        $fullAddress = "$partnerBillingStreet, $partnerBillingCity, $partnerBillingState, $partnerBillingCountry";

        $items = $this->lineItems->map(function ($item) {
            $amount = $item->getSubtotal();

            return "$item->description: $$amount";
        })->implode(" \n ");

        $totalTax = $this->total_tax ?: '$0.00';
        $adjustment = $this->adjustment ?: '$0.00';
        $discount = $this->discount_total ?: '$0.00';
        $subtotal = $this->subtotal ?: '$0.00';
        $total = $this->total ?: '$0.00';
        $pendingCredits = $this->pending_credits ?: '$0.00';

        $block->text("*Dirección:* $fullAddress\n *Caso:* $projectName\n\n *Items*\n$items\n\n *Ajuste:* $$adjustment\n *Descuento:* $$discount\n *Impuestos*: $$totalTax\n *Subtotal:* $$subtotal \n *Total:* $$total\n *Crédito Pendiente:* $$pendingCredits")->markdown();
        $block->field("*Número:* $number")->markdown();
        $block->field("*Estado:* $statusName")->markdown();
        $block->field("*Cliente:* $partnerName")->markdown();
        $block->field("*Teléfono:* $partnerPhoneNumber")->markdown();
        $block->field("*Fecha:* $date")->markdown();
    }
}
