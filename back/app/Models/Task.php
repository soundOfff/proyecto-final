<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name', 'hourly_rate', 'description', 'start_date', 'due_date', 'priority', 'repeat_id', 'recurring_type', 'recurring', 'is_infinite', 'billable', 'total_cycles', 'taskable_type', 'taskable_id'];

    /**
     * Get all of the owning taskable models.
     */

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
