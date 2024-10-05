<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffRequest;
use App\Http\Resources\StaffResource;
use App\Http\Resources\StaffResourceCollection;
use App\Http\Resources\StaffSelectResourceCollection;
use App\Models\Staff;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class StaffController extends Controller
{
    public function select(Request $request)
    {
        $staffs = DB::table('staff')
            ->selectRaw('id, CONCAT(first_name, " ", last_name) as name')
            ->where('active', true)
            ->when($request->has('filter.has-channels'), function ($query) {
                $query->whereNotNull('slack_channel');
            })
            ->orderBy('name')
            ->get();

        return new StaffSelectResourceCollection($staffs);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Staff::class)
            ->allowedSorts(
                [
                    'id',
                    'first_name',
                    AllowedSort::field('email'),
                    AllowedSort::field('created_at'),
                    AllowedSort::field('updated_at'),
                    AllowedSort::field('last_login'),
                    AllowedSort::field('active'),
                ]
            );

        $staffs = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new StaffResourceCollection($staffs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StaffRequest $request)
    {
        $newStaff = $request->validated();
        $newStaff['role_id'] = isset($newStaff['role_id']) ? $newStaff['role_id'] : 1;
        $newStaff['last_login'] = now();
        $newStaff['last_ip'] = $request->ip();

        $staff = Staff::create($newStaff);

        $staff->password = Hash::make($newStaff['password']);
        $staff->token = $staff->createToken('api')->plainTextToken;
        $staff->save();

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $staff = QueryBuilder::for(Staff::class)
            ->allowedIncludes('projects')
            ->where('email', $staff->email)
            ->first();

        return new StaffResource($staff);
    }

    public function getUser(Staff $staff)
    {
        $staff = QueryBuilder::for(Staff::class)
            ->allowedIncludes('projects.status')
            ->find($staff->id);

        return new StaffResource($staff);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Staff $staff, StaffRequest $request)
    {
        $updatedStaff = $request->validated();

        $staff->update($updatedStaff);

        return response()->json($staff, 200);
    }

    public function stats(Staff $staff)
    {
        $taskCounts = Task::selectRaw('task_status_id, COUNT(*) as count')
            ->whereHas('assigneds', function ($query) use ($staff) {
                $query->where('staff_id', $staff->id);
            })
            ->groupBy('task_status_id')
            ->pluck('count', 'task_status_id');

        $pendingTasks = $taskCounts[TaskStatus::PENDING] ?? 0;
        $inProgressTasks = $taskCounts[TaskStatus::IN_PROGRESS] ?? 0;
        $completedTasks = $taskCounts[TaskStatus::COMPLETED] ?? 0;

        return response()->json(
            [
                'data' => [
                    'pendingTasks' => $pendingTasks,
                    'inProgressTasks' => $inProgressTasks,
                    'completedTasks' => $completedTasks,
                ],
            ],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        Staff::destroy($staff->id);

        return response()->json(null, 204);
    }
}
