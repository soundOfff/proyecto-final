"use client";

import { Table, TableBody, TableRow } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import TableRowComponent from "./table-row-component";
import { attach } from "/actions/payments";
import useInvoicePayments from "/hooks/useInvoicePayments";

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
    header: "Total de Factura",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Factura balance vencido",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Importe a crédito",
  },
];

export default function ModalContent({ payment, setOpenModal }) {
  const { id: paymentId, partialTotalPaid, partner_id } = payment;

  const { invoices, payments, totalPaid, handleAmountChanges, isValid } =
    useInvoicePayments(partialTotalPaid, partner_id);

  const handlePartialPaymentApply = () => {
    const data = {
      payments: payments,
      payment_id: paymentId,
    };
    attach(data).then(() => {
      setOpenModal(false);
    });
  };

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
            <TableRowComponent
              key={invoice.id}
              invoice={invoice}
              handleAmountChanges={handleAmountChanges}
            />
          ))}
        </TableBody>
      </Table>
      <MDBox display="flex" justifyContent="end" my={5}>
        <MDTypography variant="h6" color="text" fontWeight="medium">
          Importe a Crédito: ${totalPaid}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="end" my={5}>
        <MDTypography
          variant="h6"
          color={partialTotalPaid >= totalPaid ? "text" : "error"}
          fontWeight="medium"
        >
          Importe Pendiente: ${partialTotalPaid - totalPaid}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="end" mt={5}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={handlePartialPaymentApply}
          disabled={!isValid()}
        >
          Guardar
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
