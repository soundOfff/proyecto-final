<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: "Helvetica", "Arial", sans-serif;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        p {
            margin: 0;
        }

        h2 {
            margin: 0;
        }

        td,
        th {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px;
        }

        th {
            background-color: #f2f2f2;
        }

        .table-footer {
            text-align: right;
            width: max-content;
            font-weight: bold;
            padding-right: 16px;
            white-space: nowrap;
        }

        .tax-col {
            width: max-content;
            margin: 0;
            padding: 10px 0;
        }

        .header {
            margin-bottom: 20px;
            margin-top: 10px;
        }

        .header p {
            margin-top: 10px;
            font-weight: bold;
        }

        .header-date {
            margin: 25px 0;
        }
    </style>
</head>

<body>
    <div class="header">
        <h2>#{{ $title }}-{{ $number }}</h2>
        <p>{{ $project_name }}</p>
    </div>
    <div class="header-date">
        <p>Fecha: {{ $start_date }}</p>
        <p>Valida hasta: {{ $end_date }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Artículo</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Impuesto</th>
                <th>Importe</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td><b>{{$item->description}}</b></br>{{$item->long_description}}</td>
                <td>{{$item->quantity}}</td>
                <td>
                    <p>@money_format($item->rate)</p>
                </td>

                @if(count($item->taxes) > 0)
                <td>
                    @foreach($item->taxes as $tax)
                    <p class="tax-col">{{$tax->name . " " . $tax->rate }}</p>
                    @endforeach
                </td>
                @else
                <td></td>
                @endif

                <td>
                    <p>@money_format($item->getTotalAmount())</p>
                </td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" class="table-footer">Total neto:</td>
                <td>
                    <p>@money_format($total)</p>
                </td>
            </tr>
        </tfoot>
    </table>

</body>

</html>