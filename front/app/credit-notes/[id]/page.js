import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Header from "./components/header";
import Table from "./components/table";
import Footer from "./components/footer";
import { show } from "/actions/credit-notes";

export default async function Show({ params: { id } }) {
  const creditNote = await show(id, {
    include: ["lineItems.taxes", "partner", "project"],
  });

  return (
    <MDBox mt={2} mb={4}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} className="container-print">
          <Card className="container-print">
            <Header creditNote={creditNote} />
            <Table creditNote={creditNote} />
            <Footer creditNote={creditNote} />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
