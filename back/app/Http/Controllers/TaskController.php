<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskResourceCollection;
use App\Models\Taggable;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Task::class)
            ->allowedIncludes([
                'tags',
                'timers',
                'priority',
                'status',
                'comments',
                'checklistItems',
                'assigneds',
                'partner',
                'followers',
                'taskable',
                'reminders',
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
                                ->where('owner_id', $value)
                                ->orWhereHas(
                                    'assigneds',
                                    fn (Builder $query) => $query->where('staff_id', $value)
                                );
                        }
                    ),
                    AllowedFilter::callback(
                        'period',
                        fn (Builder $query, $value) => $query->whereHas(
                            'timers',
                            fn (Builder $query) => $query->whereBetween('start_time', $value)
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
        $tags = $newTask['tags'];
        $newTask['task_status_id'] = TaskStatus::getInProgress()->id;
        $task = Task::create($newTask);

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $task->id;
            $tag['taggable_type'] = 'task';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        return response()->json(null, 201);
    }

    public function update(Task $task, TaskRequest $request)
    {
        $newTask = $request->validated();
        $tags = isset($newTask['tags']) ? $newTask['tags'] : null;
        $comments = isset($newTask['comments']) ? $newTask['comments'] : null;
        $checklistItems = isset($newTask['checklist_items']) ? $newTask['checklist_items'] : null;
        $assigneds = isset($newTask['assigneds']) ? $newTask['assigneds'] : null;
        $followers = isset($newTask['followers']) ? $newTask['followers'] : null;
        $reminders = isset($newTask['reminders']) ? $newTask['reminders'] : null;
        $task->update($newTask);

        if (isset($comments)) {
            $task->comments()->delete();
            $task->comments()->createMany($comments);
        }

        if (isset($checklistItems)) {
            $task->checklistItems()->delete();
            $task->checklistItems()->createMany($checklistItems);
        }

        if (isset($assigneds)) {
            $assignedIds = array_column($assigneds, 'id');
            $task->assigneds()->sync($assignedIds);
        }

        if (isset($followers)) {
            $followerIds = array_column($followers, 'id');
            $task->followers()->sync($followerIds);
        }

        if (isset($reminders)) {
            $task->reminders()->delete();
            $task->reminders()->createMany($reminders);
        }

        if (isset($tags)) {
            $task->tags()->detach();
            foreach ($tags as $tag) {
                $tag['taggable_id'] = $task->id;
                $tag['taggable_type'] = 'task';
                $tag['tag_id'] = $tag['id'];
                Taggable::create($tag);
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
            ->when($projectId, function ($query, $projectId) {
                return $query->selectRaw("task_statuses.id, task_statuses.name, SUM(IF(tasks.taskable_id = $projectId AND tasks.taskable_type = 'project', 1, 0)) as count");
            },
                function ($query) {
                    return $query->selectRaw('task_statuses.id, task_statuses.name, COUNT(task_status_id) as count');
                })

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
                'checklistItems',
                'assigneds',
                'followers',
                'taskable',
                'reminders',
            ])
            ->find($task->id);

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

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
            $ownerId, function ($tasks) use ($ownerId) {
                return $tasks->where('owner_id', $ownerId);
            }
        )->when(
            $projectId, function ($tasks) use ($projectId) {
                return $tasks->where('taskable_id', $projectId)->where('taskable_type', 'project');
            }
        );

        $totalTime = $tasks->sum(fn ($task) => $task->getTotalTime());

        $totalDayTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($dayStart, $dayEnd));

        $totalWeekTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($weeklyStart, $weeklyEnd));

        $totalLastWeekTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($lastWeeklyStart, $lastWeeklyEnd));

        $totalMonthTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($monthlyStart, $monthlyEnd));

        $totalLastMonthTime = $tasks
            ->sum(fn ($task) => $task->getTotalTime($lastMonthlyStart, $lastMonthlyEnd));

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
}
