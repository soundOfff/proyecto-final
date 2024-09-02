<?php

namespace App\Models;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\TaskResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'title',
        'body',
        'staff_devices_id',
        'notification_priority_id',
        'created_by',
        'staff_id',
        'is_seen',
        'is_archived',
        'notifiable_id',
        'notifiable_type'
    ];

    public function staffDevice()
    {
        return $this->belongsTo(StaffDevice::class, 'staff_devices_id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function creator()
    {
        return $this->belongsTo(Staff::class, 'created_by');
    }

    public function priority()
    {
        return $this->belongsTo(NotificationPriority::class, 'notification_priority_id');
    }

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }

    public static function getNotifiableTypes(): array
    {
        return [
            'task' => [
                'resource' => TaskResource::class,
                'load' => ['taskable'],
            ],
        ];
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query
                    ->where('title', 'like', "%$search%")
                    ->orWhere('body', 'like', "%$search%")
                    ->orWhere(function ($query) use ($search) {
                        $query->whereHasMorph(
                            'notifiable',
                            '*',
                            function ($query, $type) use ($search) {
                                if ($type == Task::class) {
                                    // todo: check if the notification is morphed from another resource and search for invoice number
                                    $query->whereHasMorph(
                                        'taskable',
                                        '*',
                                        function ($query, $type) use ($search) {
                                            if ($type == Project::class) {
                                                $query->where('name', 'like', "%$search%");
                                            } else if ($type == Invoice::class) {
                                                $query->where('number', 'like', "%$search%");
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    });
            });
        });
    }
}
