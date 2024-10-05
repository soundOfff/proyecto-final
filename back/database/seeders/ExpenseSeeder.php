<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Services\Utils;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
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
        $expenses = $this->utils->csvToArray(database_path('imports/expenses.csv'));

        foreach ($expenses as $expense) {
            Expense::updateOrCreate(['id' => $expense['id']], $expense);
        }
    }
}
