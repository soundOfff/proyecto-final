<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProposalCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'proposalId' => $this->proposal_id,
            'staffId' => $this->staff_id,
            'content' => $this->content,
            'dateAdded' => $this->date_added,
            'createdAt' => $this->created_at,
            'staff' => StaffResource::make($this->whenLoaded('staff')),
            'proposal' => ProposalResource::make($this->whenLoaded('proposal')),
        ];
    }
}
