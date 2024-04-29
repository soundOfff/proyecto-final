"use client";

import { Table, TableBody, TableRow } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import TableRowComponent from "./table-row-component";
import { store as storeCredits } from "/actions/credits";
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

<<<<<<< HEAD
export default function ModalContent({ payment, setOpenModal }) {
  const { partialTotalPaid, partner_id } = payment;

  const { invoices, payments, totalPaid, handleAmountChanges, isValid } =
    useInvoicePayments(partialTotalPaid, partner_id);
=======
export default function ModalContent({ creditNote, setOpenModal }) {
  const { invoices, payments, totalPaid, handleAmountChanges, isValid } =
    useInvoicePayments(creditNote.pendingCredits, creditNote.partner.id);

  const { data: session } = useSession();
>>>>>>> d829e24e64276ddc44788f79adb9352b10b21c84

  const handleCreditApply = () => {
    const data = {
      payments: payments,
      credit_note_id: creditNote.id,
      staff_id: session.staff.id,
    };
    storeCredits(data).then(() => {
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
<<<<<<< HEAD
          Importe a Crédito: ${partialTotalPaid}
=======
          Importe a Crédito: ${totalPaid}
>>>>>>> d829e24e64276ddc44788f79adb9352b10b21c84
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="end" my={5}>
        <MDTypography
          variant="h6"
<<<<<<< HEAD
          color={partialTotalPaid >= totalPaid ? "text" : "error"}
          fontWeight="medium"
        >
          Importe Pendiente: ${partialTotalPaid - totalPaid}
=======
          color={creditNote.pendingCredits >= totalPaid ? "text" : "error"}
          fontWeight="medium"
        >
          Importe Pendiente: ${creditNote.pendingCredits - totalPaid}
>>>>>>> d829e24e64276ddc44788f79adb9352b10b21c84
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="end" mt={5}>
        <MDButton
          variant="gradient"
          color="success"
          onClick={handleCreditApply}
          disabled={!isValid()}
        >
          Guardar
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
