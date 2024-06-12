<?php

namespace App\Services;

use App\Models\ExpenseRepeat;
use App\Models\Invoice;
use App\Models\Partner;
use App\Models\Procedure;
use App\Models\Project;
use App\Models\Reminder;
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
        if ($newRelations['tags']) {
            $oldTags = $oldRelations['tags']->pluck('id')->toArray();
            $newTags = array_column($newRelations['tags'], 'id');
            $isTagsChanged = $this->hasChanges($oldTags, $newTags);

            if ($isTagsChanged) {
                if (count($oldRelations['tags'])) {
                    $changes['old']['tags'] = $oldRelations['tags']->pluck('name');
                }
                $changes['attributes']['tags'] = Tag::whereIn('id', array_column($newRelations['tags'], 'id'))->get()->pluck('name');
            }
        }

        if ($newRelations['dependencies']) {
            $oldDependencies = $oldRelations['dependencies']->pluck('id')->toArray();
            $newDependencies = array_column($newRelations['dependencies'], 'id');
            $isDependenciesChanged = $this->hasChanges($oldDependencies, $newDependencies);

            if ($isDependenciesChanged) {
                if (count($oldRelations['dependencies'])) {
                    $oldDependenciesNames = $oldRelations['dependencies']->pluck('name');
                    $changes['old']['dependencies'] = $oldDependenciesNames;
                }
                $newDependenciesNames = Task::whereIn('id', array_column($newRelations['dependencies'], 'id'))->get()->pluck('name');
                $changes['attributes']['dependencies'] = $newDependenciesNames;
            }
        }

        if ($newRelations['checklistItems']) {
            $oldChecklistItems = $oldRelations['checklistItems']->pluck('description')->toArray();
            $newChecklistItems = array_column($newRelations['checklistItems'], 'description');
            $isChecklistItemsChanged = $this->hasChanges($oldChecklistItems, $newChecklistItems);

            if ($isChecklistItemsChanged) {
                if (count($oldRelations['checklistItems'])) {
                    $changes['old']['checklistItems'] = $oldChecklistItems;
                }
                $changes['attributes']['checklistItems'] = $newChecklistItems;
            }
        }

        if ($newRelations['comments']) {
            $oldComments = $oldRelations['comments']->pluck('content')->toArray();
            $newComments = array_column($newRelations['comments'], 'content');
            $isCommentsChanged = $this->hasChanges($oldComments, $newComments);

            if ($isCommentsChanged) {
                if (count($oldRelations['comments'])) {
                    $changes['old']['comments'] = $oldComments;
                }
                $changes['attributes']['comments'] = $newComments;
            }
        }

        if ($newRelations['assigneds']) {
            $oldAssigneds = $oldRelations['assigneds']->pluck('id')->toArray();
            $newAssigneds = array_column($newRelations['assigneds'], 'id');
            $isAssignedsChanged = $this->hasChanges($oldAssigneds, $newAssigneds);

            if ($isAssignedsChanged) {
                if (count($oldRelations['assigneds'])) {
                    $oldAssignedsNames = $oldRelations['assigneds']->map(function ($assigned) {
                        return $assigned->first_name.' '.$assigned->last_name;
                    });
                    $changes['old']['assigneds'] = $oldAssignedsNames;
                }
                $assignedIds = array_column($newRelations['assigneds'], 'id');
                $newAssignedsNames = Staff::whereIn('id', $assignedIds)->get()->map(function ($assigned) {
                    return $assigned->first_name.' '.$assigned->last_name;
                });
                $changes['attributes']['assigneds'] = $newAssignedsNames;
            }
        }

        if ($newRelations['followers']) {
            $oldFollowers = $oldRelations['followers']->pluck('id')->toArray();
            $newFollowers = array_column($newRelations['followers'], 'id');
            $isFollowersChanged = $this->hasChanges($oldFollowers, $newFollowers);

            if ($isFollowersChanged) {
                if (count($oldRelations['followers'])) {
                    $oldFollowersNames = $oldRelations['followers']->map(function ($assigned) {
                        return $assigned->first_name.' '.$assigned->last_name;
                    });
                    $changes['old']['followers'] = $oldFollowersNames;
                }
                $newFollowersIds = array_column($newRelations['followers'], 'id');
                $newFollowersNames = Staff::whereIn('id', $newFollowersIds)->get()->map(function ($assigned) {
                    return $assigned->first_name.' '.$assigned->last_name;
                });
                $changes['attributes']['followers'] = $newFollowersNames;
            }
        }

        if ($newRelations['reminders']) {
            $oldReminders = $oldRelations['reminders']->select(['date', 'description'])->toArray();
            $newReminders = array_map(
                fn ($reminder) => ['date' => $reminder['date'], 'description' => $reminder['description']],
                $newRelations['reminders']
            );
            $isRemindersChanged = $this->hasChanges($oldReminders, $newReminders);

            if ($isRemindersChanged) {
                if (count($oldRelations['reminders'])) {
                    $reminders = $oldRelations['reminders'];
                    $changes['old']['reminders'] = $reminders->map(function ($reminder) {
                        return "Fecha: $reminder->date, Descripción: $reminder->description";
                    });
                }
                $changes['attributes']['reminders'] = array_map(function ($reminder) {
                    return "Fecha: $reminder[date], Descripción: $reminder[description]";
                }, $newRelations['reminders']);
            }
        }

        if ($newRelations['requiredFields']) {
            $oldRequiredFields = $oldRelations['requiredFields']->pluck('field')->toArray();
            $newRequiredFields = array_column($newRelations['requiredFields'], 'field');
            $isFieldsChanged = $this->hasChanges($oldRequiredFields, $newRequiredFields);

            if ($isFieldsChanged) {
                if (count($oldRelations['requiredFields'])) {
                    $changes['old']['requiredFields'] = $oldRequiredFields;
                }
                $changes['attributes']['requiredFields'] = $newRequiredFields;
            }
        }

        return $changes;
    }

    private function hasChanges($a, $b): bool
    {
        $a = array_map('serialize', $a);
        $b = array_map('serialize', $b);

        return count(
            array_diff(
                array_merge($a, $b),
                array_intersect($a, $b)
            )
        ) != 0;
    }
}
