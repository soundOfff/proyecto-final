import { Suspense } from "react";
import Form from "../../components/form";
import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { show } from "/actions/courts";

export default async function EditCourt({ params: { id } }) {
  const court = await show(id);

  return (
    <Suspense>
      <Card sx={{ overflow: "visible", my: 3 }}>
        <MDBox p={3}>
          <MDTypography variant="h5" mb={2}>
            Editar Juzgado
          </MDTypography>
          <Form court={court} />
        </MDBox>
      </Card>
    </Suspense>
  );
}
