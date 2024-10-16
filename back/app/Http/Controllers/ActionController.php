<?php

namespace App\Http\Controllers;

use App\Actions\TaskActions;
use App\Http\Resources\ActionResourceCollection;
use App\Models\Action;
use App\Models\Task;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ActionController extends Controller
{
    public function index()
    {
        $query = QueryBuilder::for(Action::class);

        $actions = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ActionResourceCollection($actions);
    }

    public function dispatch(Request $request)
    {
        $action_id = $request->get('action_id');
        $task_id = $request->get('task_id');

        $action = Action::findOrFail($action_id);
        $task = Task::findOrFail($task_id);

        TaskActions::handleAction($task, $action);

        return response()->json(['success' => true]);
    }
}
