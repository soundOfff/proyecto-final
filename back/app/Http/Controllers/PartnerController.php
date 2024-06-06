<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnerRequest;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\PartnerResourceCollection;
use App\Http\Resources\PartnerSelectResourceCollection;
use App\Models\Partner;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PartnerController extends Controller
{
    public function select()
    {
        $partners = QueryBuilder::for(Partner::class)
            ->allowedFilters([
                AllowedFilter::exact('is_consolidator'),
                AllowedFilter::callback('is_juridic', function ($query, $value) {
                    return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? $query->whereNotNull('company') : $query->whereNotNull('name');
                }),
            ])
            ->where(function ($query) {
                $query->whereNotNull('company')->orWhereNotNull('name');
            })
            ->get();

        return new PartnerSelectResourceCollection($partners);
    }

    public function stats()
    {
        $total = Partner::all()->count();
        $active = Partner::where('active', true)->count();
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
        $query = QueryBuilder::for(Partner::class)
            ->allowedIncludes([
                'contacts',
                'country',
                'relatedPartners',
                'files',
                'consolidator',
            ])
            ->allowedFilters([
                AllowedFilter::scope('search'),

            ])
            ->orderBy('id', 'desc');

        $partners = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new PartnerResourceCollection($partners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PartnerRequest $request)
    {
        $newPartner = $request->validated();

        $partner = Partner::create($newPartner);

        $relatedPartnersData = $newPartner['related_partners'];

        foreach ($relatedPartnersData as $relatedData) {
            $partner->relatedPartners()->attach($relatedData['related_partner_id'], [
                'start_date' => $relatedData['start_date'],
                'end_date' => $relatedData['end_date'],
                'partner_type_id' => $relatedData['partner_type_id'],
                'active' => $relatedData['active'],
            ]);   
        }

        return response()->json($partner, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Partner $partner)
    {
        $partner = QueryBuilder::for(Partner::class)
            ->allowedIncludes([
                'projects',
                'country',
                'shippingCountry',
                'billingCountry',
                'relatedPartners',
                'contacts',
                'files',
                'consolidator',
                'primaryContact',
                'jurisdiction.district.province',
            ])
            ->find($partner->id);

        return new PartnerResource($partner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PartnerRequest $request, Partner $partner)
    {
        $partnerUpdate = $request->validated();

        $partner->update($partnerUpdate);

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        //
    }
}
