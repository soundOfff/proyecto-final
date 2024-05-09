<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Procedure extends Model
{
    protected $fillable = [
        'id',
        'process_id',
        'procedure_status_id',
        'responsible_id',
        'step_number',
        'name',
        'description',
    ];

    public function process(): BelongsTo
    {
        return $this->belongsTo(Process::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ProcedureStatus::class, 'procedure_status_id');
    }

    public function responsible(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'responsible_id');
    }
}
