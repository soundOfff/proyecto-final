"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import { useRouter } from "next/navigation";
import { useItemTotals } from "/hooks/useItemTotals";
import { toProject } from "/actions/proposals";
import { ACCEPTED } from "/utils/constants/proposalStatuses";
import usePrint from "/hooks/usePrint";
import SlackShare from "/components/SlackShare";

export default function Footer({ proposal }) {
  const router = useRouter();
  const { itbmsTotalTax, retainingTotalTax } = useItemTotals({
    items: proposal.items,
    discountType: proposal.discountType,
  });
  const { isGeneratingPdf, handlePrint } = usePrint({
    documentType: "proposal",
    documentId: proposal.id,
  });

  const handleToEstimate = () => {
    router.push(`/estimates/create/${proposal.id}`);
  };

  const handleToProject = async () => {
    await toProject(proposal.id);
  };

  return (
    <MDBox p={3} className="footer-print">
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
                  ${numberFormat(proposal.subtotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Descuento</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(proposal.discountTotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Ajuste</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(proposal.adjustment)}
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
                  ${numberFormat(proposal.total)}
                </MDTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}></Grid>
        <Grid item xs={12} lg={7}>
          <MDBox
            display="flex"
            height={{ xs: "auto", md: "100%" }}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
            mt={{ xs: 2, md: 0 }}
          >
            <MDButton
              variant="gradient"
              color="success"
              onClick={handleToEstimate}
              sx={{ mr: 2, displayPrint: "none" }}
            >
              Convertir a Proforma
            </MDButton>
            {proposal.statusId == ACCEPTED && (
              <MDButton
                variant="gradient"
                color="warning"
                onClick={handleToProject}
                sx={{ mr: 2, displayPrint: "none" }}
              >
                Convertir a Caso
              </MDButton>
            )}
            <SlackShare
              modelId={proposal.id}
              modelType="Proposal"
              boxProps={{ displayPrint: "none", mr: 2 }}
            />
            <MDButton
              variant="gradient"
              color="dark"
              onClick={handlePrint}
              disabled={isGeneratingPdf}
              sx={{ displayPrint: "none" }}
            >
              {isGeneratingPdf ? "Generando..." : "Imprimir"}
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
