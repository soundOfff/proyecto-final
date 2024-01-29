<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'expense_category_id' => 'required|numeric|exists:expense_categories,id',
            'project_id' => 'nullable|numeric|exists:projects,id',
            'billable' => 'required|boolean',
            'currency_id' => 'required|numeric|exists:currencies,id',
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'partner_id' => 'required|numeric|exists:partners,id',
            'create_invoice_billable' => 'nullable|boolean',
            'send_invoice_to_customer' => 'nullable|boolean',
            'is_infinite' => 'nullable|boolean',
            'total_cycles' => 'required_if:is_infinite,false',
            'name' => 'nullable|string',
            'note' => 'nullable|string',
            'invoice_id' => 'nullable|numeric|exists:invoices,id',
            'tax_id' => 'nullable|numeric|exists:taxes,id',
            'tax2_id' => 'nullable|numeric|exists:taxes,id',
            'repeat_id' => 'nullable|exists:expense_repeats,id',
            'payment_method_id' => 'nullable|numeric|exists:payment_methods,id',
            'reference_no' => 'nullable|string',
            'recurring_type' => 'nullable|numeric',
            'recurring' => 'nullable|numeric',
        ];
    }
}
