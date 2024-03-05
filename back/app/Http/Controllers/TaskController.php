<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskResourceCollection;
use App\Models\Taggable;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Database\Eloquent\Builder;
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
                    AllowedFilter::exact('project_id', 'taskable.id'),
                    AllowedFilter::exact('task_status_id'),
                    AllowedFilter::exact('partner_id'),
                    AllowedFilter::callback(
                        'my_tasks',
                        fn (Builder $query, $value) =>
                            $query->where('owner_id', $value)),
                    AllowedFilter::callback(
                        'period',
                        fn (Builder $query, $value) =>
                            $query->whereHas('timers',
                            fn (Builder $query) =>
                                $query->whereBetween('start_time', $value))
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
}
