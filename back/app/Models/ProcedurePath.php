<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcedurePath extends Model
{
    protected $fillable = ['from_procedure_id', 'to_procedure_id', 'condition'];

    public function fromProcedure()
    {
        return $this->belongsTo(Procedure::class, 'from_procedure_id');
    }

    public function toProcedure()
    {
        return $this->belongsTo(Procedure::class, 'to_procedure_id');
    }
}
