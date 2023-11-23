<?php

namespace App\Services;

class Utils
{
    public function csvToArray($file)
    {
        $rows = array_map('str_getcsv', file($file));
        $header = array_shift($rows);
        $csv = [];
        foreach ($rows as $row) {
            $row = array_map(function ($value) {
                return $value === 'null' ? null : $value;
            }, $row);
            $csv[] = array_combine($header, $row);
        }

        return $csv;
    }
}
