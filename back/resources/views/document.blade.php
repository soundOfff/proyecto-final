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
        <img src="@get_public_file(brandfactors-logo.png)" width="300" height="72" />
        <table class="header-table" style="width: 100%;" cellspacing="0" cellpadding="0">
            <tr>
                <td style="width: 50%;">
                    <div class="data">
                        <p class="title">VELO LEGAL</p>
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
        <div class="header">
            <h2>#{{ $title }}-{{ $number }}</h2>
            <p>{{ $project_name }}</p>
        </div>
        <div class="header-info">
            <p>FECHA: {{ $start_date }}</p>
            <p>VÁLIDA HASTA: {{ $end_date }}</p>
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
                    <td class="description"><b>{{mb_strtoupper($item->description)}}</b></br>{{mb_strtoupper($item->long_description)}}</td>
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
    </div>
    @if($type == "Estimate")
    <footer>
        <div>
            <aside>
                <h2><span>NOTAS</span></h2>
                <div>
                    <p>{{ $notes }}</p>
                </div>
            </aside>
            <aside>
                <h2><span>TÉRMINOS Y CONDICIONES</span></h2>
                <div>
                    <p>{{ $terms }}</p>
                </div>
            </aside>
        </div>
    </footer>
    @endif
</body>

</html>