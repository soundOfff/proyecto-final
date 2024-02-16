<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResourceCollection;
use App\Models\Taggable;
use App\Models\Task;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    
    public function index()
    {
        $query = QueryBuilder::for(Task::class);

        $tasks = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new TaskResourceCollection($tasks);
    }

    public function store(TaskRequest $request)
    {
        $newTask = $request->validated();
        $tags = $newTask['tags'];
        $task = Task::create($newTask);

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $task->id;
            $tag['taggable_type'] = 'task';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        return response()->json(null, 201);
    }
}
