<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskResourceCollection;
use App\Http\Resources\TaskSelectResourceCollection;
use App\Models\Staff;
use App\Models\Taggable;
use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\TaskTimer;
use App\Pipes\TaskPipe;
use App\Services\FcmService;
use App\Sorts\TaskAuthorSort;
use App\Sorts\TaskPartnerSort;
use App\Sorts\TaskPrioritySort;
use App\Sorts\TaskStatusSort;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Facades\CauserResolver;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    public function __construct(protected FcmService $fcmService) {}

    public function select()
    {
        $tasks = Task::all();

        return new TaskSelectResourceCollection($tasks);
    }

    public function index()
    {
        $query = QueryBuilder::for(Task::class)
            ->allowedIncludes([
                'tags',
                'timers',
                'priority',
                'status',
                'dependencies',
                'comments',
                'checklistItems',
                'assigneds',
                'partner',
                'followers',
                'taskable',
                'reminders',
                'actions',
                'author',
            ])
            ->allowedSorts([
                'id',
                'name',
                'start_date',
                'due_date',
                'milestone_order',
                AllowedSort::custom('status', new TaskStatusSort(), 'id'),
                AllowedSort::custom('priority', new TaskPrioritySort(), 'id'),
                AllowedSort::custom('author', new TaskAuthorSort(), 'first_name'),
                AllowedSort::custom('partner', new TaskPartnerSort()),
            ])
            ->allowedFilters(
                [
                    AllowedFilter::exact('taskable_id'),
                    AllowedFilter::exact('taskable_type'),
                    AllowedFilter::exact('task_status_id'),
                    AllowedFilter::exact('partner_id'),
                    AllowedFilter::exact('taskable_type'),
                    AllowedFilter::exact('taskable_id'),
                    AllowedFilter::callback(
                        'staff_id',
                        function (Builder $query, $value) {
                            $query
                                ->whereHas(
                                    'assigneds',
                                    fn(Builder $query) => $query->where('staff_id', $value)
                                );
                        }
                    ),
                    AllowedFilter::callback(
                        'period',
                        fn(Builder $query, $value) => $query->whereHas(
                            'timers',
                            fn(Builder $query) => $query->whereBetween('start_time', $value)
                        )
                    ),
                ]
            );

        $tasks = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new TaskResourceCollection($tasks);
    }

    public function store(TaskRequest $request)
    {
        $newTask = $request->validated();
        // $tags = isset($newTask['tags']) ? $newTask['tags'] : [];
        $dependencies = $newTask['dependencies'];
        $newTask['task_status_id'] = TaskStatus::getInProgress()->id;
        $defaultDurationMinutes = $newTask['initial_duration_minutes'] ?? 0;

        if (! array_key_exists('milestone_order', $newTask)) {
            $newTask['milestone_order'] = Task::getLatestMilestoneOrder($newTask['taskable_id'], $newTask['taskable_type']) + 1; // Next milestone order
        }

        $task = Task::create($newTask);

        if ($defaultDurationMinutes > 0) {
            TaskTimer::create([
                'task_id' => $task->id,
                'start_time' => Carbon::now(),
                'end_time' => Carbon::now()->add($defaultDurationMinutes, 'minutes'),
                'staff_id' => $task->owner_id,
            ]);
        }

        $dependencyIds = array_column($dependencies, 'id');
        $task->dependencies()->sync($dependencyIds);

        $task->requiredFields()->createMany($newTask['requiredFields']);

        // foreach ($tags as $tag) {
        //     $tag['taggable_id'] = $task->id;
        //     $tag['taggable_type'] = 'task';
        //     $tag['tag_id'] = $tag['id'];
        //     Taggable::create($tag);
        // }

        return response()->json(null, 201);
    }

    public function update(Task $task, TaskRequest $request)
    {
        $newTask = $request->validated();
        $tags = isset($newTask['tags']) ? $newTask['tags'] : null;
        $dependencies = isset($newTask['dependencies']) ? $newTask['dependencies'] : [];
        $comments = isset($newTask['comments']) ? $newTask['comments'] : null;
        $checklistItems = isset($newTask['checklist_items']) ? $newTask['checklist_items'] : null;
        $assigneds = isset($newTask['assigneds']) ? $newTask['assigneds'] : [];
        $followers = isset($newTask['followers']) ? $newTask['followers'] : [];
        $reminders = isset($newTask['reminders']) ? $newTask['reminders'] : null;
        $requiredFields = isset($newTask['requiredFields']) ? $newTask['requiredFields'] : null;

        CauserResolver::setCauser(Staff::find($newTask['owner_id'] ?? $task->owner_id));

        $task->load('tags', 'dependencies', 'comments', 'checklistItems', 'assigneds', 'followers', 'reminders', 'requiredFields');
        $oldRelations = [
            'tags' => $task->tags,
            'dependencies' => $task->dependencies,
            'comments' => $task->comments,
            'checklistItems' => $task->checklistItems,
            'assigneds' => $task->assigneds,
            'followers' => $task->followers,
            'reminders' => $task->reminders,
            'requiredFields' => $task->requiredFields,
        ];
        $newRelations = [
            'tags' => $tags,
            'dependencies' => $dependencies,
            'comments' => $comments,
            'checklistItems' => $checklistItems,
            'assigneds' => $assigneds,
            'followers' => $followers,
            'reminders' => $reminders,
            'requiredFields' => $requiredFields,
        ];

        Task::addLogChange(new TaskPipe($oldRelations, $newRelations));

        $task->update($newTask);

        if ($comments) {
            $task->comments()->delete();
            $task->comments()->createMany($comments);
        } elseif ($comments === []) {
            $task->comments()->delete();
        }

        if ($checklistItems) {
            $task->checklistItems()->delete();
            $task->checklistItems()->createMany($checklistItems);
        } elseif ($checklistItems === []) {
            $task->checklistItems()->delete();
        }

        if ($reminders) {
            $task->reminders()->delete();
            $task->reminders()->createMany($reminders);
        } elseif ($reminders === []) {
            $task->reminders()->delete();
        }

        if ($requiredFields) {
            $task->requiredFields()->delete();
            $task->requiredFields()->createMany($requiredFields);
        } elseif ($requiredFields === []) {
            $task->requiredFields()->delete();
        }

        if ($tags) {
            $task->tags()->detach();
            foreach ($tags as $tag) {
                $tag['taggable_id'] = $task->id;
                $tag['taggable_type'] = 'task';
                $tag['tag_id'] = $tag['id'];
                Taggable::create($tag);
            }
        }

        $dependencyIds = array_column($dependencies, 'id');
        $task->dependencies()->sync($dependencyIds);

        $assignedIds = array_column($assigneds, 'id');
        $task->assigneds()->sync($assignedIds);

        $followerIds = array_column($followers, 'id');
        $task->followers()->sync($followerIds);

        if (isset($newTask['task_status_id']) && $newTask['task_status_id'] == TaskStatus::COMPLETED && $task->isFinalTask()) {
            $staffs = Staff::whereIn(
                'id',
                array_merge(
                    isset($newTask['assigneds']) ? $newTask['assigneds'] : array_column($task->assigneds->toArray(), 'id') ?? [],
                    isset($newTask['followers']) ? $newTask['followers'] : array_column($task->followers->toArray(), 'id') ?? [],
                    isset($newTask['owner_id']) ? [$newTask['owner_id']] : [$task->owner_id]
                )
            )->with('devices')->get();
            foreach ($staffs as $staff) {
                foreach ($staff->devices as $device) {
                    $taskName = isset($newTask['name']) ? $newTask['name'] : $task->name;
                    $this->fcmService->sendNotification(
                        $device->device_token,
                        'Tarea Completada',
                        "La tarea \"$taskName\" ha sido completada, puede elegir el siguiente proceso",
                        $staff->id,
                        strtolower(class_basename(Task::class)),
                        $task->id
                    );
                }
            }
        }

        return response()->json(null, 204);
    }

    /**
     * Counting rows by status.
     */
    public function countByStatuses(Request $request)
    {
        $projectId = $request->input('project_id');
        $countByStatuses = DB::table('task_statuses')
            ->when(
                $projectId,
                function ($query, $projectId) {
                    return $query->selectRaw("task_statuses.id, task_statuses.name, SUM(IF(tasks.taskable_id = $projectId AND tasks.taskable_type = 'project', 1, 0)) as count");
                },
                function ($query) {
                    return $query->selectRaw('task_statuses.id, task_statuses.name, COUNT(task_status_id) as count');
                }
            )

            ->leftJoin('tasks', 'tasks.task_status_id', '=', 'task_statuses.id')
            ->groupBy('task_statuses.id', 'task_statuses.name')
            ->get();

        return response()->json($countByStatuses);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task = QueryBuilder::for(Task::class)
            ->allowedIncludes([
                'tags',
                'priority',
                'status',
                'comments',
                'dependencies',
                'checklistItems',
                'assigneds',
                'followers',
                'taskable',
                'reminders',
                'actions',
                'requiredFields',
                'author',
                'procedure',
            ])
            ->find($task->id);

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        if ($task->milestone_order) {
            Task::where('taskable_id', $task->taskable_id)
                ->where('taskable_type', $task->taskable_type)
                ->where('milestone_order', '>', $task->milestone_order)
                ->decrement('milestone_order');
        }

        $task->dependencies()->detach();
        $task->delete();

        return response()->json(null, 204);
    }

    public function destroyMany(Request $request)
    {
        $taskIds = $request->validate([
            'taskIds' => 'required|array',
            'taskIds.*' => 'required|exists:tasks,id',
        ])['taskIds'];

        foreach ($taskIds as $taskId) {
            $task = Task::find($taskId);
            if ($task->milestone_order) {
                Task::where('taskable_id', $task->taskable_id)
                    ->where('taskable_type', $task->taskable_type)
                    ->where('milestone_order', '>', $task->milestone_order)
                    ->decrement('milestone_order');
            }
            $task->dependencies()->detach();
            $task->delete();
        }

        return response()->json(null, 204);
    }

    public function stats(Request $request)
    {
        $ownerId = $request->query('ownerId');
        $projectId = $request->query('projectId');

        $dayStart = now()->startOfDay();
        $dayEnd = now()->endOfDay();

        $weeklyStart = now()->startOfWeek();
        $weeklyEnd = now()->endOfWeek();
        $monthlyStart = now()->startOfMonth();
        $monthlyEnd = now()->endOfMonth();

        $lastWeeklyStart = now()->subWeek()->startOfWeek();
        $lastWeeklyEnd = now()->subWeek()->endOfWeek();
        $lastMonthlyStart = now()->subMonth()->startOfMonth();
        $lastMonthlyEnd = now()->subMonth()->endOfMonth();

        $tasks = Task::all()->when(
            $ownerId,
            function ($tasks) use ($ownerId) {
                return $tasks->where('owner_id', $ownerId);
            }
        )->when(
            $projectId,
            function ($tasks) use ($projectId) {
                return $tasks->where('taskable_id', $projectId)->where('taskable_type', 'project');
            }
        );

        $totalTime = $tasks->sum(fn($task) => $task->getTotalTime());

        $totalDayTime = $tasks
            ->sum(fn($task) => $task->getTotalTime($dayStart, $dayEnd));

        $totalWeekTime = $tasks
            ->sum(fn($task) => $task->getTotalTime($weeklyStart, $weeklyEnd));

        $totalLastWeekTime = $tasks
            ->sum(fn($task) => $task->getTotalTime($lastWeeklyStart, $lastWeeklyEnd));

        $totalMonthTime = $tasks
            ->sum(fn($task) => $task->getTotalTime($monthlyStart, $monthlyEnd));

        $totalLastMonthTime = $tasks
            ->sum(fn($task) => $task->getTotalTime($lastMonthlyStart, $lastMonthlyEnd));

        $monthlyPercentage = $totalLastMonthTime
            ? (($totalMonthTime - $totalLastMonthTime) / $totalLastMonthTime) * 100
            : $totalMonthTime;

        $weeklyPercentage = $totalLastWeekTime
            ? (($totalWeekTime - $totalLastWeekTime) / $totalLastWeekTime) * 100
            : $totalWeekTime;

        return response()->json([
            'total_time' => $totalTime,
            'total_week_time' => $totalWeekTime,
            'total_month_time' => $totalMonthTime,
            'total_day_time' => $totalDayTime,
            'monthly_percentage' => $monthlyPercentage,
            'weekly_percentage' => $weeklyPercentage,
        ], 200);
    }

    public function editSteps(Request $request)
    {
        $data = $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|exists:tasks,id',
            'tasks.*.milestone_order' => 'required|integer',
        ]);

        $tasks = $data['tasks'];

        foreach ($tasks as $task) {
            $taskToUpdate = Task::find($task['id']);
            $taskToUpdate->update(['milestone_order' => $task['milestone_order']]);
        }

        return response()->json(null, 204);
    }
}
