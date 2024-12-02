"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import numberFormat from "/utils/numberFormat";
import { TableRow } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

export default function TableRowComponent({ invoice, handleAmountChanges }) {
  const [amount, setAmount] = useState(0);

  const validate = () => {
    return Boolean(amount && amount > invoice.pendingToPay);
  };

  return (
    <TableRow>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          <Link href={`/invoices/${invoice.id}`}>{invoice.number}</Link>
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          {invoice.date}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          {invoice.project?invoice.project.name:""}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          ${numberFormat(invoice.total)}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          ${numberFormat(invoice.pendingToPay)}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDInput
          type="number"
          onChange={(e) => {
            setAmount(e.target.value, invoice.id);
            handleAmountChanges(e.target.value, invoice.id);
          }}
        />
        {validate() && (
          <MDBox mt={2}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              Supera el total de la factura
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </TableRow>
  );
}
