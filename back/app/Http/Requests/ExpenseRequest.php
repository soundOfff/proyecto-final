<?php

namespace App\Http\Requests;

use App\Models\ExpenseRepeat;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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
            'billable' => 'required|boolean',
            'currency_id' => 'required|numeric|exists:currencies,id',
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'partner_id' => 'required|numeric|exists:partners,id',
            'is_infinite' => 'required_with:repeat_id|boolean',
            'create_invoice_billable' => 'nullable|boolean',
            'send_invoice_to_customer' => 'nullable|boolean',
            'total_cycles' => Rule::requiredIf(
                fn () => isset(request()->repeat_id) && request()->is_infinite == 0
            ),
            'name' => 'nullable|string',
            'note' => 'nullable|string',
            'invoice_id' => 'nullable|numeric|exists:invoices,id',
            'project_id' => 'nullable|numeric|exists:projects,id',
            'tax_id' => 'nullable|numeric|exists:taxes,id',
            'tax2_id' => 'nullable|numeric|exists:taxes,id',
            'repeat_id' => 'nullable|exists:expense_repeats,id',
            'payment_method_id' => 'nullable|numeric|exists:payment_methods,id',
            'reference_no' => 'nullable|string',
            'recurring_type' => 'required_if:repeat_id,8',
            'files' => "nullable|array",
            'files_info' => 'nullable|array',
            'recurring' => 'required_if:repeat_id,8',
        ];
    }
}
