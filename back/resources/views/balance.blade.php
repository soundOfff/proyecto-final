<!DOCTYPE html>
<html>

<head>
    <style>
        @page {
            margin: 0 1cm;
            padding: 0;
            size: A4;
        }

        body {
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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
        }

        th {
            background-color: #f2f2f2;
        }

        .items-table {
            font-size: 10px;
        }

        table .description {
            max-width: 300px;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .table-footer {
            text-align: right;
            width: max-content;
            font-weight: bold;
            padding: 16px;
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

        .header-table {
            width: 100%;
            margin-bottom: 20px;
        }
        .header-table,
        .header-table td {
            border: none !important;
            vertical-align: top;
        }

        h1 {
            text-align: center;
        }

        .content {
            padding-bottom: 50px;
        }

        footer {
            position: relative;
            margin-top: 50px;
            bottom: 0;
            left: 0;
            right: 0;
            height: auto;
            text-align: left;
            line-height: 0.75cm;
        }

        aside {
            margin: 20px 0;
        }

        aside h2 {
            color: black;
            border: none;
            border-width: 0 0 1px;
            color: black;
            border-color: #999;
            border-bottom-style: solid;
        }

        aside p {
            font-size: 10px;
            color: rgba(105, 105, 109, 1);
        }
    </style>
</head>

<body>
    <header>
        <!-- <img src="@get_public_file(new-logo.png)" width="300" height="72" /> -->
        <table class="header-table" style="width: 100%;" cellspacing="0" cellpadding="0">
            <tr>
                <td style="width: 50%;">
                    <div class="data">
                        <p class="title">Aplicacion Legal</p>
                        <p>AV. CINCUENTENARIO, OFICINA 5B</p>
                        <p>SAN FRANCISCO PANAMÁ</p>
                        <p>REPUBLICA DE PANAMÁ</p>
                        <p>RUC: 25040265-3-2019 D.V.50</p>
                    </div>
                </td>
                <td style="width: auto; text-align: right;">
                    <div class="data">
                        <p class="title">PARA</p>
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

    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>Factura #</th>
                    <th>Subtotal</th>
                    <th>Ajuste</th>
                    <th>Facturado</th>
                    <th>Pagos</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $index => $item)
                <tr>
                    <td class="description"><b>{{$item->number}}</b></td>
                    <td>
                        <p>@money_format($item->subtotal)</p>
                    </td>
                    <td>
                        <p>@money_format($item->adjustment)</p>
                    </td>
                    <td>
                        <p>@money_format($item->total)</p>
                    </td>
                    <td>
                    @foreach($item->payments as $index => $pay)
                        <p>@money_format($pay->pivot->amount) - {{ \Carbon\Carbon::parse($pay->pivot->created_at)->format('d/m/Y') }}</p>
                    @endforeach
                    </td>
                    <td>
                        <p>@money_format($item->pending_to_pay)</p>
                    </td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
    <tr>
        <td colspan="6" style="text-align: right;">
            <ul style="list-style: none; margin: 0; padding: 0; text-align: right;">
                <li>
                    <strong>Deuda facturada:</strong>
                    <span>@money_format($total_billed)</span>
                </li>
                <li>
                    <strong>Total pago:</strong>
                    <span>@money_format($total_paid)</span>
                </li>
                <li>
                    <strong>Total neto:</strong>
                    <span>@money_format($total)</span>
                </li>
            </ul>
        </td>
    </tr>
</tfoot>


        </table>
    </div>
</body>

</html>