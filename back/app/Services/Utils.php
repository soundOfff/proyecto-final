<?php

namespace App\Services;

class Utils
{
    public function csvToArray($file = '', $delimiter = ',')
    {
        if (! file_exists($file) || ! is_readable($file)) {
            return false;
        }

        $header = null;
        $data = [];
        if (($handle = fopen($file, 'r')) !== false) {
            while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
                if (! $header) {
                    $header = $row;
                } else {
                    $row = array_map(function ($value) {
                        return $value === '' || $value === 'null' ? null : $value;
                    }, $row);
                    $data[] = array_combine($header, $row);
                }
            }
            fclose($handle);
        }

        return $data;
    }
}
