<?php

namespace App\Http\Resources;

use App\Models\Process;
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
            'responsiblePerson' => $this->responsible_person_id,
            'cost' => $this->cost,
            'ratePerHour' => $this->rate_per_hour,
            'startDate' => $this->start_date,
            'demandAmount' => $this->demand_amount,
            'amount' => $this->amount,
            'juryNumber' => $this->jury_number,
            'onSchedule' => $this->on_schedule,
            'documentUrl' => $this->document_url,
            'type' => $this->type,
            'billablePartnerId' => $this->billable_partner_id,
            'proposalId' => $this->proposal_id,
            'processId' => $this->process_id,
            'files' => FileResource::collection($this->whenLoaded('files')),
            'createdAt' => Carbon::parse($this->created_at)->format('d-m-Y'),
            'billingType' => ProjectBillingTypeResource::make($this->whenLoaded('billingType')),
            'serviceType' => ProjectServiceTypeResource::make($this->whenLoaded('serviceType')),
            'proposal' => ProposalResource::make($this->whenLoaded('proposal')),
            'stages' => ProjectStageResource::collection($this->whenLoaded('stages')),
            'members' => StaffResource::collection($this->whenLoaded('members')),
            'notes' => ProjectNoteResource::collection($this->whenLoaded('notes')),
            'status' => ProjectStatusResource::make($this->whenLoaded('status')),
            'jurisdiction' => JurisdictionResource::make($this->whenLoaded('jurisdiction')),
            'billablePartner' => PartnerResource::make($this->whenLoaded('billablePartner')),
            'selectedProcesses' => $this->whenLoaded('tasks', function () {
                return ProcessResource::collection($this->tasks->map(function ($task) {
                    return $task->procedure ? $task->procedure->process : null;
                })->filter()->unique('id')->values());
            }),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'lawFirm' => LawFirmResource::make($this->whenLoaded('lawFirm')),
            'staffs' => StaffResource::collection($this->whenLoaded('staffs')),
            'partners' => PartnerResource::collection($this->whenLoaded('partners')),
            'process' => ProcessResource::make($this->whenLoaded('process')),
            'court' => CourtResource::make($this->whenLoaded('court')),
        ];
    }
}
