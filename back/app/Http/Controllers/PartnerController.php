<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnerRequest;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\PartnerResourceCollection;
use App\Http\Resources\PartnerSelectResourceCollection;
use App\Models\Partner;
use App\Models\PartnerType;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedSort;
use App\Sorts\TotalBilledPartnerSort;

class PartnerController extends Controller
{
    public function select()
    {
        $partners = QueryBuilder::for(Partner::class)
            ->allowedFilters([
                AllowedFilter::exact('is_consolidator'),
                AllowedFilter::callback('is_juridic', function ($query, $value) {
                    return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? $query->whereNotNull('partners.company') : $query->whereNotNull('partners.name');
                }),
                AllowedFilter::callback('owners', function ($query, $value) {
                    $query
                    ->select('owners.*')
                    ->join('related_partner', 'partners.id', '=', 'related_partner.partner_id')
                    ->join('partners as owners', 'related_partner.related_partner_id', '=', 'owners.id')
                    ->where('related_partner.partner_id', $value)
                    ->where('related_partner.partner_type_id', PartnerType::OWNER);
                }),
            ])
            ->where(function ($query) {
                $query->whereNotNull('partners.company')->orWhereNotNull('partners.name');
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
            ->allowedSorts([
                'id',
                'name',
                'company',
                'created_at',
                AllowedSort::custom('totalBilledCost', new TotalBilledPartnerSort(), 'totalBilledCost'),
            ]);

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

        $relatedPartnersData = isset($newPartner['related_partners']) ? $newPartner['related_partners'] : [];

        foreach ($relatedPartnersData as $relatedData) {
            $partner->relatedPartners()->attach($relatedData['related_partner_id'], [
                'start_date' => $relatedData['start_date'],
                'end_date' => $relatedData['end_date'],
                'partner_type_id' => $relatedData['partner_type_id'],
                'seat' => $relatedData['seat'],
                'check_in' => $relatedData['check_in'],
                'deed' => $relatedData['deed'],
                'deed_date' => $relatedData['deed_date'],
                'legal_circuit' => $relatedData['legal_circuit'],
                'notary' => $relatedData['notary'],
                'sheet' => $relatedData['sheet'],
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

        $relatedPartnersData = $partnerUpdate['related_partners'];
        $pivotData = [];

        foreach ($relatedPartnersData as $relatedData) {
            $pivotData[$relatedData['related_partner_id']] = [
                'start_date' => $relatedData['start_date'],
                'end_date' => $relatedData['end_date'],
                'partner_type_id' => $relatedData['partner_type_id'],
                'seat' => $relatedData['seat'],
                'check_in' => $relatedData['check_in'],
                'deed' => $relatedData['deed'],
                'deed_date' => $relatedData['deed_date'],
                'legal_circuit' => $relatedData['legal_circuit'],
                'notary' => $relatedData['notary'],
                'sheet' => $relatedData['sheet'],
                'active' => $relatedData['active'],
            ];
        }

        $partner->relatedPartners()->sync($pivotData);
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
