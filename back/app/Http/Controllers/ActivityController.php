<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResourceCollection;
use App\Services\ActivityService;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ActivityController extends Controller
{
    public function __construct(protected ActivityService $activityService)
    {
    }

    public function index()
    {
        $activities = QueryBuilder::for(Activity::class)
            ->allowedFilters([
                AllowedFilter::exact('subject_type'),
                AllowedFilter::exact('subject_id'),
                AllowedFilter::exact('causer_by'),
                AllowedFilter::exact('causer_type'),
            ])
            ->allowedIncludes(['subject', 'causer'])
            ->orderBy('created_at', 'desc')
            ->get();

        return new ActivityResourceCollection($activities);
    }
}
