<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;

class Process extends Model
{
    protected $fillable = [
        'id',
        'project_service_type_id',
        'author_id',
        'name',
        'description',
    ];

    protected $appends = [
        'step_quantity',
    ];

    protected function stepQuantity(): Attribute
    {
        return new Attribute(
            get: fn () => $this->procedures->count()
        );
    }

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
        $stepQuantity = $this->procedures->count() ?: '-';
        $authorName = $this->author ? $this->author->name : '-';
        $departmentName = $this->projectServiceType ? $this->projectServiceType->label : '-';
        $procedures = $this->procedures->map(function ($procedure) {
            return "#$procedure->step_number: $procedure->name";
        })->implode(" \n ");

        $block->text("*Nombre:* $name\n *Descripción:* $description\n *Procedimientos:* $procedures\n")->markdown();
        $block->field("*Cantidad de Pasos:* $stepQuantity")->markdown();
        $block->field("*Autor:* $authorName")->markdown();
        $block->field("*Departamento:* $departmentName")->markdown();
    }
}
