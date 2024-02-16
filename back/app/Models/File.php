<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $fillable = [
        'id',
        'invoice_id',
        'contact_id',
        'staff_id',
        'fileable_id',
        'fileable_type',
        'attachment_key',
        'date_added',
        'external',
        'external_link',
        'name',
        'type',
        'last_activity',
        'subject',
        'thumbnail_link',
        'visible_to_customer',
        'created_at',
        'updated_at',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    public function fileable(): BelongsTo
    {
        return $this->morphTo();
    }
}
