<?php

namespace App\Services;

use App\Models\Partner;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

// TODO: Make this reusable for other models
class DocumentValidationService
{
    protected static $defaultMessages = [
        'country_id.required' => 'El campo país es obligatorio.',
        'country_id.exists' => 'El país seleccionado no es válido.',
        'jurisdiction_id.required' => 'El campo jurisdicción es obligatorio.',
        'jurisdiction_id.exists' => 'La jurisdicción seleccionada no es válida.',
        'address.required' => 'El campo dirección es obligatorio.',
        'id_type.required' => 'El campo tipo de identificación es obligatorio.',
        'id_number.required' => 'El campo número de identificación es obligatorio.',
        'phone_number.required' => 'El campo número de teléfono es obligatorio.',
        'file_number.required' => 'El campo número de archivo es obligatorio.',
        'image_number.required' => 'El campo número de imagen es obligatorio.',
        'roll_number.required' => 'El campo número de rol es obligatorio.',
        'civil_status.required' => 'El campo estado civil es obligatorio.',
        'occupation.required' => 'El campo ocupación es obligatorio.',
        'check_in.required' => 'El campo fecha de ingreso es obligatorio.',
        'deed.required' => 'El campo escritura es obligatorio.',
        'notary.required' => 'El campo notario es obligatorio.',
        'deed_date.required' => 'El campo fecha de escritura es obligatorio.',
        'seat.required' => 'El campo asiento es obligatorio.',
        'legal_circuit.required' => 'El campo circuito legal es obligatorio.',
        'sheet.required' => 'El campo folio es obligatorio.',
    ];

    public function validatePartner(Partner $partner, string $role, $from)
    {
        $rules = $this->getValidationRules($role);

        if (empty($rules)) {
            throw new \InvalidArgumentException("Invalid role: $role");
        }

        $messages = $this->generateMessages($from);

        $attributes = $partner->getAttributes();
        if (isset($partner->pivot)) {
            $attributes = array_merge($partner->getAttributes(), $partner->pivot->getAttributes());
        }

        $validator = Validator::make($attributes, $rules, $messages);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    protected function getValidationRules(string $role)
    {
        switch ($role) {
            case 'defendant':
                return [
                    'country_id' => 'required|exists:countries,id',
                    'jurisdiction_id' => 'required|exists:jurisdictions,id',
                    'address' => 'required',
                    'id_type' => 'required',
                    'id_number' => 'required',
                ];
            case 'plaintiff':
                return [
                    'country_id' => 'required|exists:countries,id',
                    'jurisdiction_id' => 'required|exists:jurisdictions,id',
                    'address' => 'required',
                    'phone_number' => 'required',
                    'file_number' => 'required',
                    'image_number' => 'required',
                    'roll_number' => 'required',
                ];
            case 'representative':
                return [
                    'country_id' => 'required|exists:countries,id',
                    'jurisdiction_id' => 'required|exists:jurisdictions,id',
                    'address' => 'required',
                    'civil_status' => 'required',
                    'id_number' => 'required',
                    'id_type' => 'required',
                    'occupation' => 'required',
                    'check_in' => 'required',
                    'deed' => 'required',
                    'notary' => 'required',
                    'deed_date' => 'required',
                    'seat' => 'required',
                    'legal_circuit' => 'required',
                    'sheet' => 'required',
                ];
            default:
                return null; // Invalid role
        }
    }

    protected function generateMessages($from)
    {
        return array_map(function ($message) use ($from) {
            return str_replace('El campo', "El campo $message para el $from.", $message);
        }, array_keys(static::$defaultMessages));
    }
}
