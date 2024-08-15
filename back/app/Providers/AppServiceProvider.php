<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
        Blade::directive('money_format', function ($money): string {
            return "<?php echo '$' . number_format($money, 2); ?>";
        });

        Relation::enforceMorphMap([
            'project' => 'App\Models\Project',
            'estimate' => 'App\Models\Estimate',
            'partner' => 'App\Models\Partner',
            'expense' => 'App\Models\Expense',
            'invoice' => 'App\Models\Invoice',
            'proposal' => 'App\Models\Proposal',
            'lead' => 'App\Models\Lead',
            'task' => 'App\Models\Task',
            'staff' => 'App\Models\Staff',
            'credit_note' => 'App\Models\CreditNote',
            'procedure' => 'App\Models\Procedure',
        ]);

        Relation::morphMap(['customer' => 'App\Models\Partner']);

        try {
            Storage::extend('google', function ($app, $config) {
                $options = [];

                if (! empty($config['teamDriveId'] ?? null)) {
                    $options['teamDriveId'] = $config['teamDriveId'];
                }

                if (! empty($config['sharedFolderId'] ?? null)) {
                    $options['sharedFolderId'] = $config['sharedFolderId'];
                }

                $client = new \Google\Client();
                $client->setClientId($config['clientId']);
                $client->setClientSecret($config['clientSecret']);
                $client->refreshToken($config['refreshToken']);

                $service = new \Google\Service\Drive($client);
                $adapter = new \Masbug\Flysystem\GoogleDriveAdapter($service, $config['folder'] ?? '/', $options);
                $driver = new \League\Flysystem\Filesystem($adapter);

                return new \Illuminate\Filesystem\FilesystemAdapter($driver, $adapter);
            });
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        Http::macro('docassemble', function () {
            return Http::baseUrl(env('DOCASSEMBLE_URL'));
        });
    }
}
