<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'addedFrom' => $this->added_from,
            'dateFinished' => $this->date_finished,
            'deadline' => $this->deadline,
            'description' => $this->description,
            'estimatedHours' => $this->estimated_hours,
            'expedient' => $this->expedient,
            'name' => $this->name,
            'progress' => $this->progress,
            'progressFromTasks' => $this->progress_from_tasks,
            'cost' => $this->cost,
            'ratePerHour' => $this->rate_per_hour,
            'startDate' => $this->start_date,
            'amount' => $this->amount,
            'juryNumber' => $this->jury_number,
            'onSchedule' => $this->on_schedule,
            'createdAt' => Carbon::parse($this->created_at)->format('d-m-Y'),
            'billingType' => ProjectBillingTypeResource::make($this->whenLoaded('billingType')),
            'serviceType' => ProjectServiceTypeResource::make($this->whenLoaded('serviceType')),
            'stages' => ProjectStageResource::collection($this->whenLoaded('stages')),
            'members' => StaffResource::collection($this->whenLoaded('members')),
            'notes' => ProjectNoteResource::collection($this->whenLoaded('notes')),
            'status' => ProjectStatusResource::make($this->whenLoaded('status')),
            'jurisdiction' => JurisdictionResource::make($this->whenLoaded('jurisdiction')),
            'defendant' => PartnerResource::make($this->whenLoaded('defendant')),
            'plaintiff'=> PartnerResource::make($this->whenLoaded('plaintiff')),
            'responsiblePerson' => PartnerResource::make($this->whenLoaded('responsiblePerson')),
            'lawFirm' => LawFirmResource::make($this->whenLoaded('lawFirm')),
            'staffs' => StaffResource::collection($this->whenLoaded('staffs')),
        ];
    }
}
