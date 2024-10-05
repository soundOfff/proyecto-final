<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    private $utils;

    public function __construct(Utils $utils = null)
    {
        $this->utils = $utils;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = $this->utils->csvToArray(database_path('imports/expense_categories.csv'));

        foreach ($categories as $category) {
            ExpenseCategory::updateOrCreate(['id' => $category['id']], $category);
        }
    }
}
