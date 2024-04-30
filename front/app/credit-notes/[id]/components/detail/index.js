import { Grid, Card } from "@mui/material";
import MDBox from "/components/MDBox";
import Header from "./header";
import Table from "./table";
import Footer from "./footer";
import { useDataProvider } from "/providers/DataProvider";

export default function IndexComponent() {
  const { creditNote } = useDataProvider();

  return (
    <MDBox mt={2} mb={4} className="container-print">
      <Grid container justifyContent="center" className="card-container-print">
        <Grid item xs={12} sm={10} md={8} className="card-container-print">
          <Card className="card-container-print">
            <Header creditNote={creditNote} />
            <Table creditNote={creditNote} />
            <Footer creditNote={creditNote} />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
