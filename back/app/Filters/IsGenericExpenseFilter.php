<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class IsGenericExpenseFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);

        $query
            ->when($value, function (Builder $query) {
                $query
                    ->whereNull('estimate_id')
                    ->whereNull('invoice_id')
                    ->whereNull('project_id');
            }, function (Builder $query) {
                $query
                    ->whereNotNull('estimate_id')
                    ->orWhereNotNull('invoice_id')
                    ->orWhereNotNull('project_id');
            });
    }
}
