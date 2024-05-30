<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffRequest;
use App\Http\Resources\StaffResource;
use App\Http\Resources\StaffResourceCollection;
use App\Http\Resources\StaffSelectResourceCollection;
use App\Models\Project;
use App\Models\Staff;
use App\Models\Task;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class StaffController extends Controller
{
    public function select()
    {
        $staffs = Staff::where('active', true)->get();

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
        $staff = QueryBuilder::for(Staff::class)->find($staff->id);

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        // TODO: ask if it needed to pass the data to another staff as the old system
        Staff::destroy($staff->id);

        return response()->json(null, 204);
    }
}
