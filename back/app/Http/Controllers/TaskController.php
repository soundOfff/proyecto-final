 <?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskResourceCollection;
use App\Models\Taggable;
use App\Models\Task;
use App\Models\TicketStatus;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Task::class)
            ->allowedIncludes(['tags', 'priority', 'status', 'comments', 'checklistItems', 'assigneds', 'followers']);

        $tasks = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new TaskResourceCollection($tasks);
    }

    public function store(TaskRequest $request)
    {
        $newTask = $request->validated();
        $tags = $newTask['tags'];
        $newTask['ticket_status_id'] = TicketStatus::getInProgress()->id;
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
        $tags = $newTask['tags'];
        $comments = $newTask['comments'];
        $checklistItems = $newTask['checklist_items'];
        $assigneds = $newTask['assigneds'];
        $followers = $newTask['followers'];
        $newTask['ticket_status_id'] = TicketStatus::getInProgress()->id;
        $task->update($newTask);

        if ($comments) {
            $task->comments()->createMany($comments);
        }

        if ($checklistItems) {
            $task->checklistItems()->delete();
            $task->checklistItems()->createMany($checklistItems);
        }

        if ($assigneds) {
            $assignedIds = array_column($assigneds, 'id');
            $task->assigneds()->sync($assignedIds);
        }

        if ($followers) {
            $followerIds = array_column($followers, 'id');
            $task->followers()->sync($followerIds);
        }

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $task->id;
            $tag['taggable_type'] = 'task';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        return response()->json(null, 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task = QueryBuilder::for(Task::class)
            ->allowedIncludes(['tags', 'priority', 'status', 'comments', 'checklistItems', 'assigneds', 'followers'])
            ->find($task->id);

        return new TaskResource($task);
    }
}
