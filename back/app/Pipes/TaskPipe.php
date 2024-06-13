<?php

namespace App\Pipes;

use App\Services\ActivityService;
use Closure;
use Spatie\Activitylog\Contracts\LoggablePipe;
use Spatie\Activitylog\EventLogBag;

class TaskPipe implements LoggablePipe
{
    private ActivityService $activityService;

    private array $oldRelations;

    private array $newRelations;

    public function __construct(
        array $oldRelations,
        array $newRelations,
    ) {
        $this->activityService = new ActivityService();
        $this->oldRelations = $oldRelations;
        $this->newRelations = $newRelations;
    }

    public function handle(EventLogBag $event, Closure $next): EventLogBag
    {
        $event->changes = $this->activityService->getNames($event->changes);

        $event->changes = $this->activityService->addRelations(
            $event->changes,
            $this->oldRelations,
            $this->newRelations,
        );

        return $next($event);
    }
}
