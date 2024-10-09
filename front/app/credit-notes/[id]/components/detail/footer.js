"use client";

import { Grid } from "@mui/material";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import { useItemTotals } from "/hooks/useItemTotals";
import { useState } from "react";
import ModalContent from "./modal/content";
import SlackShare from "/components/SlackShare";

export default function Footer({ creditNote }) {
  const { itbmsTotalTax, retainingTotalTax } = useItemTotals({
    items: creditNote.items,
    discountType: creditNote.discountType,
  });
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleInvoiceApply = async () => {
    setOpenModal(true);
  };

  return (
    <MDBox p={3} className="footer-print">
      <Modal open={openModal} onClose={handleClose} width="80%">
        <ModalContent creditNote={creditNote} setOpenModal={setOpenModal} />
      </Modal>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid container columnSpacing={5} rowSpacing={1} my={5}>
              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Total Neto:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(creditNote.subtotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Descuento</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(creditNote.discountTotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Ajuste</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(creditNote.adjustment)}
                </MDTypography>
              </Grid>

              {itbmsTotalTax != 0 && (
                <>
                  <Grid item xs={12} sm={7} />
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="h6">I.T.B.M.S(7.00%)</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <MDTypography variant="body">
                      ${numberFormat(itbmsTotalTax)}
                    </MDTypography>
                  </Grid>
                </>
              )}

              {retainingTotalTax != 0 && (
                <>
                  <Grid item xs={12} sm={7} />
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="h6">
                      Agente Retenedor(-3.50%)
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <MDTypography variant="body">
                      ${numberFormat(retainingTotalTax)}
                    </MDTypography>
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Total:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(creditNote.total)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Crédito Pendiente:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(creditNote.pendingCredits)}
                </MDTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}></Grid>
        <Grid item xs={12} lg={7}>
          <MDBox
            width="100%"
            height={{ xs: "auto", md: "100%" }}
            display="flex"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
            mt={{ xs: 2, md: 0 }}
          >
            {!creditNote.invoiceId && (
              <MDButton
                variant="gradient"
                color="success"
                onClick={handleInvoiceApply}
                sx={{ mr: 2, displayPrint: "none" }}
              >
                Aplicar a Factura
              </MDButton>
            )}
            <SlackShare
              modelId={creditNote?.id}
              modelType="CreditNote"
              boxProps={{ displayPrint: "none", mr: 2 }}
            />
            <MDButton
              variant="gradient"
              color="dark"
              onClick={() => window.print(this)}
              sx={{ displayPrint: "none" }}
            >
              Imprimir
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
