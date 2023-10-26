/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sales dashboard components
import DefaultCell from "/pagesComponents/projects/components/DefaultCell";

const dataTableData = {
  columns: [
    { Header: "Cliente", accessor: "client" },
    { Header: "Saldo/Capital", accessor: "amount", align: "right" },
    { Header: "Firma Asignada", accessor: "signature" },
    { Header: "Jurisdicción", accessor: "jurisdiction" },
    { Header: "Etapa", accessor: "stage" },
    { Header: "Comentarios", accessor: "comments" },
  ],

  rows: [
    {
      client: <DefaultCell>Roderick Tam Castillo</DefaultCell>,
      amount: <DefaultCell>$130.992</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>La Chorrera</DefaultCell>,
      stage: <DefaultCell>2. Admision Demanda</DefaultCell>,
      comments: <DefaultCell>Pendiente de admisión de la demanda.</DefaultCell>,
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$80.250</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>3. Notificacion de demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          La demanda se admite mediante el Auto No. 2189 del 12 de septiembre de
          2023 y se solicita notificación.
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Guillermo Aldana Rodriguez</DefaultCell>,
      amount: <DefaultCell>$40.600</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>La Chorrera</DefaultCell>,
      stage: <DefaultCell>2. Admision Demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          La demanda se admite mediante el Auto No. 2189 del 12 de septiembre de
          2023 y se solicita notificación.
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Alberto Caballero Diaz</DefaultCell>,
      amount: <DefaultCell>$91.300</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>2. Admision Demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          La demanda se admite mediante Auto No. 973 del 14 de septiembre de
          2023, y se envía a notificación
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$140.925</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>3. Notificacion de demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          Presentamos demanda el día 20 de septiembre de 2023.
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$140.925</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>3. Notificacion de demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          Solicitamos retiro de demanda ya que quedó repartida al juzgado 4to
          originalmente, estamos en espera del oficio de desglose
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$140.925</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>4. Solicitud de Remate</DefaultCell>,
      comments: (
        <DefaultCell>
          La demanda se admite mediante Auto No. 2112 del 13 de septiembre de
          2023 y se envía a notificación.
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$140.925</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>2. Admision Demanda</DefaultCell>,
      comments: (
        <DefaultCell>
          La demanda se admite mediante Auto No. 2112 del 13 de septiembre de
          2023 y se envía a notificación.
        </DefaultCell>
      ),
    },
    {
      client: <DefaultCell>Victor Antonio Sanchez Rosario</DefaultCell>,
      amount: <DefaultCell>$140.925</DefaultCell>,
      signature: <DefaultCell>Velo legal</DefaultCell>,
      jurisdiction: <DefaultCell>Panama</DefaultCell>,
      stage: <DefaultCell>4. Solicitud de Remate</DefaultCell>,
      comments: (
        <DefaultCell>
          Solicitamos la notificación del demandado, se admitió la demanda el 31
          de julio de 2023, sin embargo por error del juzgado el auto no se
          digitalizó en tiempo oportuno.
        </DefaultCell>
      ),
    },
  ],
};

export default dataTableData;
