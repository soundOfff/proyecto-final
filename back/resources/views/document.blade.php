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

        header {
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

        table .description {
            max-width: 300px;
            white-space: wordwrap;
            overflow-wrap: break-word;
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

        .header-info {
            margin: 25px 0;
        }

        .header-info :first-child {
            color: 0;
        }

        .table-container {
            width: 100%;
        }

        .table-container td {
            padding: 0;
            vertical-align: top;
        }

        .data {
            margin-top: 20px;
            color: rgba(105, 105, 109, 1);
        }

        .title {
            font-weight: bold;
            color: black;
        }

        .header-table,
        .header-table td {
            border: none !important;
            vertical-align: top;
        }

        h1 {
            text-align: center;
        }
    </style>
</head>

<body>
    <header>
        <img src="@get_public_file(velo-logo.png)" width="200" height="72" />
        <table class="header-table" style="width: 100%;" cellspacing="0" cellpadding="0">
            <tr>
                <td style="width: 50%;">
                    <div class="data">
                        <p class="title">Veló Legal</p>
                        <p>Av. Cincuentenario, Oficina 5B</p>
                        <p>San Francisco Panama</p>
                        <p>República de Panamá</p>
                        <p>RUC: 25040265-3-2019 D.V.50</p>
                    </div>
                </td>
                <td style="width: auto; text-align: right;">
                    <div class="data">
                        <p class="title">Para</p>
                        <p>{{ $partner['name'] }}</p>
                        <p>{{ $partner['country_info'] }}</p>
                        <p>{{ $partner['address'] }}</p>
                        <p>{{$partner['zip']}}</p>
                        <p>{{$partner['phone']}}</p>
                        <p>{{$partner['email']}}</p>
                    </div>
                </td>
            </tr>
        </table>

    </header>


    <div class="header">
        <h2>#{{ $title }}-{{ $number }}</h2>
        <p>{{ $project_name }}</p>
    </div>
    <div class="header-info">
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
                <td class="description"><b>{{$item->description}}</b></br>{{$item->long_description}}</td>
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