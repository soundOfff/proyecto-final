<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResourceCollection;
use App\Models\Notification;
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
            ->allowedIncludes(['staffDevice'])
            ->allowedSorts([
                'title',
                'body',
                'created_at',
                AllowedSort::callback('is_seen', function ($query, $descending) {
                    $direction = $descending ? 'DESC' : 'ASC';
                    $query
                        ->orderBy('is_seen', $direction)
                        ->orderBy('created_at', "DESC");
                }),
            ])
            ->allowedFilters([
                AllowedFilter::exact('is_archived'),
                AllowedFilter::callback('search', function ($query, $search) {
                    $query->where('title', 'LIKE', "%{$search}%")
                        ->orWhere('body', 'LIKE', "%{$search}%");
                }),
                AllowedFilter::callback('staffId', function ($query, $staffId) {
                    $query->whereHas('staffDevice', function ($query) use ($staffId) {
                        $query->where('staff_id', $staffId);
                    });
                }),
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

        $query =
            DB::table('notifications')
            ->selectRaw('count(*) as count')
            ->where('is_seen', false)
            ->when($request->get('staff_id'), function ($query, $staffId) {
                return $query
                    ->join('staff_devices', 'notifications.staff_devices_id', '=', 'staff_devices.id')
                    ->join('staff', 'staff_devices.staff_id', '=', 'staff.id')
                    ->where('staff.id', $staffId)
                    ->groupBy('staff.id');
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
    public function show() {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
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
        ])['notification_ids'];

        foreach ($notificationsIds as $notificationId) {
            $notification = Notification::find($notificationId);
            if ($notification) {
                $notification->update(['is_archived' => 1]);
            }
        }

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
