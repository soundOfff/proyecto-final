<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactResource;
use App\Http\Resources\ContactResourceCollection;
use App\Models\Contact;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ContactController extends Controller
{
    public function stats()
    {
        $total = Contact::all()->count();
        $active = Contact::where('active', true)->count();
        $inactive = $total - $active;

        return response()->json([
            'total' => $total,
            'active' => $active,
            'inactive' => $inactive,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Contact::class)
        ->allowedIncludes([
            'partner',
            'staff',
        ])
        ->allowedFilters('partner_id')
        ->orderBy('id', 'desc');

        $contacts = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ContactResourceCollection($contacts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request)
    {
        $newContact = $request->validated();

        $contact = Contact::create($newContact);

        $permissionIds = array_map(fn ($permission) => $permission['id'], $newContact['permissions']);

        $contact->permissions()->sync($permissionIds);

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        $contact = QueryBuilder::for(Contact::class)
        ->allowedIncludes([
            'partner',
            'staff',
            'permissions',
        ])
        ->find($contact->id);

        return new ContactResource($contact);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, Contact $contact)
    {
        $updatedContact = $request->validated();

        $contact->update($updatedContact);

        $permissionIds = array_map(fn ($permission) => $permission['id'], $updatedContact['permissions']);

        $contact->permissions()->sync($permissionIds);

        return response()->json(null, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
