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
            margin-bottom: 10px;
            margin-top: 10px;
        }

        .header h3 {
            margin: 0;
            font-weight: bold;
        }

        .header p {
            margin-top: 10px;
            font-weight: bold;
            color:#999;
        }

        .header p b {
            color: black;
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
                <td style="text-align: right;">
                    <div class="data">
                        <p class="title">PARA</p>
                        <p>{{ $partner['name'] }}</p>
                        <p>{{ $partner['country_info'] }}</p>
                        <p>{{ $partner['address'] }}</p>
                        <p>{{ $partner['zip'] }}</p>
                        <p>{{ $partner['phone'] }}</p>
                        <p>{{ $partner['email'] }}</p>
                    </div>
                </td>
            </tr>
        </table>
    </header>

    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>Nombre del proyecto</th>
                    <th>Total facturado</th>
                    <th>Total pagado</th>
                    <th>Total neto</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($items as $item)
                <tr>
                    <td class='description'><b>{{ $item['name'] }}</b></td>
                    <td>@money_format($item['billed'])</td>
                    <td>@money_format($item['paid'])</td>
                    <td>@money_format($item['paid'] - $item['billed'])</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" style="text-align: right;">
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li><strong>Deuda facturada:</strong> {{ number_format($total_billed, 2) }}</li>
                            <li><strong>Total pago:</strong> {{ number_format($total_paid, 2) }}</li>
                            <li><strong>Total neto:</strong> {{ number_format($total, 2) }}</li>
                        </ul>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>
