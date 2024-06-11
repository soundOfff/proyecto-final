<?php

namespace App\Services;

use App\Models\ExpenseRepeat;
use App\Models\Invoice;
use App\Models\Partner;
use App\Models\Procedure;
use App\Models\Project;
use App\Models\Staff;
use App\Models\Tag;
use App\Models\Task;
use App\Models\TaskPriority;
use App\Models\TaskStatus;

class ActivityService
{
    private function getNamesFromId(array $change)
    {
        foreach ($change as $key => $value) {
            if (isset($value)) {
                switch ($key) {
                    case 'author_id':
                    case 'owner_id':
                        $staff = Staff::find($value);
                        $change[$key] = $staff->first_name.' '.$staff->last_name;
                        break;

                    case 'task_id':
                        $change[$key] = Task::find($value)->name;
                        break;

                    case 'procedure_id':
                        $change[$key] = Procedure::find($value)->name;
                        break;

                    case 'invoice_id':
                        $change[$key] = Invoice::find($value)->number;
                        break;

                    case 'task_priority_id':
                        $change[$key] = TaskPriority::find($value)->name;
                        break;

                    case 'repeat_id':
                        $change[$key] = ExpenseRepeat::find($value)->label;
                        break;

                    case 'task_status_id':
                        $change[$key] = TaskStatus::find($value)->name;
                        break;

                    case 'partner_id':
                        $change[$key] = Partner::find($value)->merged_name;
                        break;

                    case 'taskable_id':
                        $change[$key] = Project::find($value)->name;
                        break;
                }
            }
        }

        return $change;
    }

    public function getNames(array $changes)
    {
        $change['old'] = $this->getNamesFromId($changes['old']);
        $change['attributes'] = $this->getNamesFromId($changes['attributes']);

        return $change;
    }

    public function addRelations(
        array $changes,
        array $oldRelations,
        array $newRelations,
    ) {
        $isTagsChanged = $oldRelations['tags']
            ->whereNotIn('id', array_column($newRelations['tags'], 'id'))
            ->count() != 0;
        if ($isTagsChanged) {
            if (count($oldRelations['tags']) && count($newRelations['tags'])) {
                $changes['old']['tags'] = $oldRelations['tags']->pluck('name');
            }
            if (count($newRelations['tags'])) {
                $changes['attributes']['tags'] = Tag::whereIn('id', array_column($newRelations['tags'], 'id'))->get()->pluck('name');
            }
        }

        $isDependenciesChanged = $oldRelations['dependencies']
            ->whereNotIn('id', array_column($newRelations['dependencies'], 'id'))
            ->count() != 0;

        if ($isDependenciesChanged) {
            if (count($oldRelations['dependencies']) && count($newRelations['dependencies'])) {
                $changes['old']['dependencies'] = $oldRelations['dependencies']->pluck('name');
            }
            if (count($newRelations['dependencies'])) {
                $changes['attributes']['dependencies'] = Task::whereIn('id', array_column($newRelations['dependencies'], 'id'))->get()->pluck('name');
            }
        }

        $isChecklistItemsChanged = $oldRelations['checklistItems']
            ->whereNotIn('description', array_column($newRelations['checklistItems'], 'description'))
            ->count() != 0;

        if ($isChecklistItemsChanged) {
            if (count($oldRelations['checklistItems']) && count($newRelations['checklistItems'])) {
                $changes['old']['checklistItems'] = $oldRelations['checklistItems']->pluck('description');
            }
            if (count($newRelations['checklistItems'])) {
                $changes['attributes']['checklistItems'] = array_column($newRelations['checklistItems'], 'description');
            }
        }

        $isCommentsChanged = $oldRelations['comments']
            ->whereNotIn('content', array_column($newRelations['comments'], 'content'))
            ->count() != 0;

        if ($isCommentsChanged) {
            if (count($oldRelations['comments']) && count($newRelations['comments'])) {
                $changes['old']['comments'] = $oldRelations['comments']->pluck('content');
            }
            if (count($newRelations['comments'])) {
                $changes['attributes']['comments'] = array_column($newRelations['comments'], 'content');
            }
        }

        $isAssignedsChanged = $oldRelations['assigneds']->whereNotIn('id', array_column($newRelations['assigneds'], 'id'))->count() != 0;

        if ($isAssignedsChanged) {
            if (count($oldRelations['assigneds']) && count($newRelations['assigneds'])) {
                $assigneds = $oldRelations['assigneds'];
                $changes['old']['assigneds'] = $assigneds->map(function ($assigned) {
                    return $assigned->first_name.' '.$assigned->last_name;
                });
            }
            if (count($newRelations['assigneds'])) {
                $assignedIds = array_column($newRelations['assigneds'], 'id');
                $changes['attributes']['assigneds'] = Staff::whereIn('id', $assignedIds)->get()->map(function ($assigned) {
                    return $assigned->first_name.' '.$assigned->last_name;
                });
            }
        }

        return $changes;
    }
}
