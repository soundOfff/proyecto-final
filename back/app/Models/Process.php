<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;

class Process extends Model
{
    protected $fillable = [
        'id',
        'project_service_type_id',
        'author_id',
        'step_quantity',
        'name',
        'description',
    ];

    public function projectServiceType(): BelongsTo // Departamento
    {
        return $this->belongsTo(ProjectServiceType::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function procedures(): HasMany
    {
        return $this->hasMany(Procedure::class);
    }

    public function validateIfStepNumberExists(int $stepNumber): bool
    {
        return $this->procedures()->where('step_number', $stepNumber)->exists();
    }

    public function forks(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'fork_process', 'process_id', 'fork_id');
    }

    public function allForks()
    {
        return $this->forks()->with('allForks');
    }

    public function forkedFrom(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'fork_process', 'fork_id', 'process_id');
    }

    public function author()
    {
        return $this->belongsTo(Staff::class, 'author_id');
    }

    public function toNotify()
    {
        return $this->belongsToMany(Staff::class, 'process_staff_to_notify', 'process_id', 'staff_id');
    }

    public function getSlackNotificationBlocks(SectionBlock $block): void
    {
        $name = $this->name ?: '-';
        $description = $this->description ?: '-';
        $stepQuantity = $this->step_quantity ?: '-';
        $authorName = $this->author ? $this->author->name : '-';
        $departmentName = $this->projectServiceType ? $this->projectServiceType->label : '-';
        $procedures = $this->procedures->map(function ($procedure) {
            return "#$procedure->step_number: $procedure->name";
        })->implode(" \n ");
        $forks = $this->forks->implode('name', '\\n');

        $block->text("*Nombre:* $name\n *Descripción:* $description\n *Procedimientos:* $procedures\n *Bifurcaciones:* $forks")->markdown();
        $block->field("*Cantidad de Pasos:* $stepQuantity")->markdown();
        $block->field("*Autor:* $authorName")->markdown();
        $block->field("*Departamento:* $departmentName")->markdown();
    }
}
