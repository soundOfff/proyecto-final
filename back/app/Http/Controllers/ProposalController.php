<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProposalRequest;
use App\Http\Resources\ProposalResource;
use App\Http\Resources\ProposalResourceCollection;
use App\Http\Resources\ProposalSelectResourceCollection;
use App\Models\LineItem;
use App\Models\LineItemTax;
use App\Models\Project;
use App\Models\ProjectBillingType;
use App\Models\ProjectStatus;
use App\Models\Proposal;
use App\Models\ProposalStatus;
use App\Models\Taggable;
use App\Sorts\ProposablePartnerSort;
use App\Sorts\ProposalStatusSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class ProposalController extends Controller
{
    public function select()
    {
        $proposals = Proposal::all();

        return new ProposalSelectResourceCollection($proposals);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = QueryBuilder::for(Proposal::class)
            ->selectRaw('proposals.*')
            ->allowedIncludes([
                'currency',
                'estimate',
                'invoice',
                'status',
                'lineItems.taxes',
                'tags',
                'proposable',
                'comments',
            ])
            ->allowedFilters([
                AllowedFilter::exact('proposable_id'),
            ])
            ->allowedSorts([
                'id', 'subject', 'total', 'date',
                AllowedSort::field('openTill', 'open_till'),
                AllowedSort::field('createdAt', 'created_at'),
                AllowedSort::custom('proposable', new ProposablePartnerSort(), 'partner_name'),
                AllowedSort::custom('status', new ProposalStatusSort(), 'label'),
            ])
            ->orderBy('id', 'desc');

        $proposals = request()->has('perPage')
            ? $query->paginate((int) request('perPage'))
            : $query->get();

        return new ProposalResourceCollection($proposals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProposalRequest $request)
    {
        $newProposal = $request->validated();
        $items = $newProposal['items'];
        $tags = $newProposal['tags'];
        $newProposal['proposable_id'] = $request->partner_id;
        $newProposal['proposable_type'] = 'customer';
        $proposal = Proposal::create($newProposal);

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $proposal->id;
            $tag['taggable_type'] = 'proposal';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        foreach ($items as $item) {
            $item['line_itemable_id'] = $proposal->id;
            $item['line_itemable_type'] = 'proposal';
            $itemTaxes = $item['taxes'];
            $lineItem = LineItem::create($item);

            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $proposal->id;
                $itemTax['line_item_taxable_type'] = 'proposal';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Proposal $proposal)
    {
        $proposal = QueryBuilder::for(Proposal::class)
            ->allowedIncludes([
                'currency',
                'discountType',
                'estimate',
                'invoice',
                'status',
                'lineItems.taxes',
                'tags',
                'proposable.primaryContact',
                'comments',
                'saleAgent',
                'country',
            ])
            ->find($proposal->id);

        return new ProposalResource($proposal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProposalRequest $request, Proposal $proposal)
    {
        $updatedProposal = $request->validated();
        $proposal->lineItems->each(function ($item) {
            $item->taxes()->delete();
        });
        $proposal->lineItems()->delete();
        $proposal->tags()->detach();
        $items = $updatedProposal['items'];
        $tags = $updatedProposal['tags'];

        $proposal->update($updatedProposal);

        foreach ($tags as $tag) {
            $tag['taggable_id'] = $proposal->id;
            $tag['taggable_type'] = 'proposal';
            $tag['tag_id'] = $tag['id'];
            Taggable::create($tag);
        }

        foreach ($items as $item) {
            $item['line_itemable_id'] = $proposal->id;
            $item['line_itemable_type'] = 'proposal';
            $itemTaxes = $item['taxes'];
            $lineItem = LineItem::create($item);

            foreach ($itemTaxes as $itemTax) {
                $itemTax['line_item_id'] = $lineItem->id;
                $itemTax['line_item_taxable_id'] = $proposal->id;
                $itemTax['line_item_taxable_type'] = 'proposal';
                LineItemTax::create($itemTax);
            }
        }

        return response()->json(null, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proposal $proposal)
    {
        $proposal->lineItems->each(function ($item) {
            $item->taxes()->delete();
        });
        $proposal->lineItems()->delete();
        $proposal->tags()->detach();
        $proposal->delete();

        return response()->json(null, 204);
    }

    public function toProject(Proposal $proposal)
    {
        abort_if($proposal->proposal_status_id !== ProposalStatus::ACCEPTED, 422, 'Proposal must be accepted to convert to project');
        abort_if($proposal->proposable_type !== 'customer', 422, 'Proposal must be for a customer to convert to project');

        Project::create([
            'start_date' => now(),
            'project_status_id' => ProjectStatus::NOT_STARTED,
            'responsible_person_id' => $proposal->sale_agent_id,
            'defendant_id' => $proposal->proposable_id,
            'project_billing_type_id' => ProjectBillingType::FIXED_PRICE,
            'project_service_type_id' => $proposal->service_type_id,
            'name' => $proposal->subject,
        ]);

        return response()->json(null, 201);
    }
}
