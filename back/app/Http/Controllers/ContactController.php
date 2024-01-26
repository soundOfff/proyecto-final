<?php

namespace App\Http\Controllers;

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
            'user.partners',
            'staff',
        ])
        ->allowedFilters('user_id')
        ->orderBy('id', 'desc');

        $contacts = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ContactResourceCollection($contacts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
