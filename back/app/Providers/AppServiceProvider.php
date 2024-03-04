<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'project' => 'App\Models\Project',
            'estimate' => 'App\Models\Estimate',
            'invoice' => 'App\Models\Invoice',
            'proposal' => 'App\Models\Proposal',
            'customer' => 'App\Models\Partner',
            'lead' => 'App\Models\Lead',
            'task' => 'App\Models\Task',
            'staff' => 'App\Models\Staff',
        ]);
    }
}
