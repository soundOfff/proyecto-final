<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResourceCollection;
use App\Models\Notification;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Notification::class)
            ->allowedIncludes(['staffDevice', 'staff', 'creator', 'notifiable', 'priority'])
            ->allowedSorts([
                'title',
                'body',
                'created_at',
                'created_by',
                'staff_id',
                AllowedSort::callback('is_seen', function ($query, $descending) {
                    $direction = $descending ? 'DESC' : 'ASC';
                    $opDirection = $descending ? 'ASC' : 'DESC';
                    $query
                        ->orderBy('is_seen', $direction)
                        ->orderBy('notification_priority_id', $opDirection)
                        ->orderBy('created_at', 'DESC');
                }),
            ])
            ->allowedFilters([
                AllowedFilter::exact('is_archived'),
                AllowedFilter::exact('staff_id'),
                AllowedFilter::exact('is_seen'),
                AllowedFilter::scope('search'),
            ]);

        $notifications = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new NotificationResourceCollection($notifications);
    }

    public function isNotSeenCount(Request $request)
    {
        $request->validate([
            'staff_id' => 'nullable|numeric|exists:staff,id',
        ]);

        $query = DB::table('notifications')
            ->selectRaw('count(*) as count')
            ->where('is_seen', false)
            ->whereNull('notifications.deleted_at')
            ->when($request->get('staff_id'), function ($query, $staffId) {
                return $query
                    ->where('notifications.staff_id', $staffId)
                    ->groupBy('notifications.staff_id');
            });

        $count = $query->get()->first() ? $query->get()->first()->count : 0;

        return response()->json(['count' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        $updatedNotification = $request->validate([
            'notification_priority_id' => 'sometimes|required|exists:notification_priorities,id',
        ]);

        $notification->update($updatedNotification);

        return response()->json(null, 204);
    }

    public function updateMany(Request $request)
    {
        $notificationsIds = $request->validate([
            'notification_ids' => 'required|array',
            'notification_ids.*' => 'required|exists:notifications,id',
            'is_seen' => 'required|boolean',
        ])['notification_ids'];

        foreach ($notificationsIds as $notificationId) {
            $notification = Notification::find($notificationId);
            if ($notification) {
                $notification->update(['is_seen' => $request->is_seen]);
            }
        }

        return response()->json(null, 204);
    }

    public function archiveMany(Request $request)
    {
        $notificationsIds = $request->validate([
            'notification_ids' => 'required|array',
            'notification_ids.*' => 'required|exists:notifications,id',
            'is_archived' => 'required|boolean',
        ])['notification_ids'];

        foreach ($notificationsIds as $notificationId) {
            $notification = Notification::find($notificationId);
            if ($notification) {
                $notification->update(['is_archived' => $request->is_archived]);
            }
        }

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(null, 204);
    }
}
