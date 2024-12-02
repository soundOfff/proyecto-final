"use client";

import { Table, TableBody, TableRow } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import TableRowComponent from "./table-row-component";
import { useEffect, useState } from "react";
import { getAll } from "/actions/invoices";
import { useDataProvider } from "/providers/DataProvider";


const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

const headers = [
  {
    box: {
      width: "auto",
      py: 1.5,
      px: 1,
      textAlign: "left",
    },
    header: "Número de Factura",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Fecha de Factura",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Total Pagado",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Total Pendiente",
  }
];

export default function ModalContent({ state }) {
    const [invoices, setInvoices] = useState([]);
    const { project } = useDataProvider();

    useEffect(() => {
        getAll({
          "filter[project_id]": project.id,
        }).then((data) => {
            console.log(data.data);
          setInvoices(data.data.invoices);
          console.log(data.data.invoices);
        });
      }, [project]);

    return (
    <MDBox p={5} overflow="auto">
      <Table sx={{ minWidth: "32rem" }}>
        <MDBox component="thead">
          <TableRow>
            {headers.map(({ box, header }, index) => (
              <MDBox
                key={`${index}-headers`}
                component="th"
                width={box.width}
                py={box.py}
                pl={box.pl}
                pr={box.pr}
                textAlign={box.textAlign}
                sx={borderBottom}
              >
                <MDTypography variant="h6" color="text" fontWeight="medium">
                  {header}
                </MDTypography>
              </MDBox>
            ))}
          </TableRow>
        </MDBox>
        <TableBody>
          {invoices.map((invoice) => (
            (invoice.status.id == state || invoice.status.id == 1) &&
            <TableRowComponent
              key={invoice.id}
              invoice={invoice}
            />
          ))}
        </TableBody>
      </Table>
    </MDBox>
  );
}
