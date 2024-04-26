<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
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
            'id' => 'sometimes|required|numeric|exists:payments,id',
            'payment_method_id' => 'required|numeric|exists:payment_methods,id',
            'partner_id' => 'required|numeric|exists:partners,id',
            'amount' => 'required|numeric',
            'expenses_amount' => 'required|numeric',
            'date' => 'required|date',
            'date_recorded' => 'nullable|date',
            'note' => 'nullable|string',
            'payment_mode' => 'nullable|string',
            'transaction_id' => 'nullable|string',
        ];
    }
}
