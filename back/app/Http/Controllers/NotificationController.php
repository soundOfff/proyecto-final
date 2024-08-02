<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResourceCollection;
use App\Models\Notification;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
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
            ->allowedSorts(['title', 'body', 'created_at'])
            ->allowedFilters([
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
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
