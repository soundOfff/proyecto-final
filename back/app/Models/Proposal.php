<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;

class Proposal extends Model
{
    use HasFactory;

    public static $SPANISH_CLASS_NAME = 'proforma';

    protected $fillable = [
        'id',
        'estimate_id',
        'invoice_id',
        'currency_id',
        'country_id',
        'contact_id',
        'proposal_status_id',
        'staff_assigned_id',
        'proposable_id',
        'proposable_type',
        'acceptance_date',
        'acceptance_email',
        'acceptance_first_name',
        'acceptance_last_name',
        'acceptance_ip',
        'added_from',
        'address',
        'adjustment',
        'allow_comments',
        'assigned',
        'city',
        'content',
        'date',
        'date_converted',
        'date_send',
        'discount_percent',
        'discount_total',
        'discount_type_id',
        'email',
        'hash',
        'is_expiry_notified',
        'open_till',
        'phone',
        'pipeline_order',
        'proposal_to',
        'show_quantity_as',
        'signature',
        'state',
        'subject',
        'subtotal',
        'total',
        'total_tax',
        'zip',
        'created_at',
    ];

    public const PROPOSABLE_CUSTOMER = 'customer';

    public function proposable(): MorphTo
    {
        return $this->morphTo();
    }

    public function staffAssigned(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'staff_assigned_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProposalStatus::class, 'proposal_status_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function discountType(): BelongsTo
    {
        return $this->belongsTo(DiscountType::class);
    }

    public function saleAgent(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'sale_agent_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ProposalComment::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function lineItems(): MorphMany
    {
        return $this->morphMany(LineItem::class, 'line_itemable');
    }

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        $number = $this->id ?: '-';
        $statusName = $this->status ? $this->status->label : '-';
        $relatedName = $this->proposable_type === 'customer' && $this->proposable_id
            ? $this->proposable->merged_name
            : '-';
        $address = $this->address ?: '-';
        $city = $this->city ?: '-';
        $state = $this->state ?: '-';
        $country = $this->country ? $this->country->short_name : '-';
        $fullAddress = "$address, $city, $state, $country";
        $phoneNumber = $this->phone ?: '-';
        $date = $this->date ? Carbon::parse($this->date)->format('Y-m-d') : '-';
        $openTill = $this->open_till ? Carbon::parse($this->open_till)->format('Y-m-d') : '-';

        $items = $this->lineItems->map(function ($item) {
            $amount = $item->getSubtotal();

            return "$item->description: $$amount";
        })->implode(" \n ");

        $totalTax = $this->total_tax ?: '$0.00';
        $adjustment = $this->adjustment ?: '$0.00';
        $discount = $this->discount_total ?: '$0.00';
        $subtotal = $this->subtotal ?: '$0.00';
        $total = $this->total ?: '$0.00';

        $block->text("*Dirección:* $fullAddress\n\n *Items*\n$items\n\n *Ajuste:* $$adjustment\n *Descuento:* $$discount\n *Impuestos*: $$totalTax\n *Subtotal:* $$subtotal \n *Total:* $$total")->markdown();
        $block->field("*Número:* $number")->markdown();
        $block->field("*Estado:* $statusName")->markdown();
        $block->field("*Para:* $relatedName")->markdown();
        $block->field("*Teléfono:* $phoneNumber")->markdown();
        $block->field("*Fecha:* $date")->markdown();
        $block->field("*Válido Hasta:* $openTill")->markdown();
    }
}
