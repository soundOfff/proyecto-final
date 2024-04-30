<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'addedFrom' => $this->added_from,
            'adjustment' => $this->adjustment,
            'adminNote' => $this->admin_note,
            'allowedPaymentModes' => $this->allowed_payment_modes,
            'billingCity' => $this->billing_city,
            'billingState' => $this->billing_state,
            'billingStreet' => $this->billing_street,
            'billingZip' => $this->billing_zip,
            'cancelOverdueReminders' => $this->cancel_overdue_reminders,
            'clientNote' => $this->client_note,
            'currency' => $this->currency,
            'customRecurring' => $this->custom_recurring,
            'cycles' => $this->cycles,
            'date' => $this->date,
            'dateSend' => $this->date_send,
            'dateCreated' => $this->date_created,
            'deletedCustomerName' => $this->deleted_customer_name,
            'discountPercent' => $this->discount_percent,
            'discountTotal' => $this->discount_total,
            'discountType' => $this->discount_type,
            'dueDate' => $this->due_date,
            'hash' => $this->hash,
            'includeShipping' => $this->include_shipping,
            'isRecurringFrom' => $this->is_recurring_from,
            'lastOverdueReminder' => $this->last_overdue_reminder,
            'lastRecurringDate' => $this->last_recurring_date,
            'numberFormat' => $this->number_format,
            'prefix' => $this->prefix,
            'recurring' => $this->recurring,
            'recurringType' => $this->recurring_type,
            'saleAgent' => $this->sale_agent,
            'sent' => $this->sent,
            'shippingCity' => $this->shipping_city,
            'shippingState' => $this->shipping_state,
            'shippingStreet' => $this->shipping_street,
            'shippingZip' => $this->shipping_zip,
            'showQuantityAs' => $this->show_quantity_as,
            'showShippingOnInvoice' => $this->show_shipping_on_invoice,
            'status' => $this->status,
            'subscriptionId' => $this->subscription_id,
            'subtotal' => $this->subtotal,
            'terms' => $this->terms,
            'token' => $this->token,
            'total' => $this->total,
            'totalCycles' => $this->total_cycles,
            'totalTax' => $this->total_tax,
            'createdAt' => $this->created_at,
            'pendingToPay' => $this->pending_to_pay,
            'partner' => PartnerResource::make($this->whenLoaded('partner')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'currency' => CurrencyResource::make($this->whenLoaded('currency')),
            'estimate' => EstimateResource::make($this->whenLoaded('estimate')),
            'billingCountry' => CountryResource::make($this->whenLoaded('billingCountry')),
            'shippingCountry' => CountryResource::make($this->whenLoaded('shippingCountry')),
            'items' => LineItemResource::collection($this->whenLoaded('lineItems')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
            'parcial_amount' => is_null($this->pivot) ? null : $this->pivot->amount,
            'pivot' => $this->pivot,
        ];
    }
}
