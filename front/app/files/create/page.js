import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Form from "./components/form";
import { Card } from "@mui/material";
import { Suspense } from "react";

export default async function FileCreate() {
  const apiUrl = process.env.API_URL;

  return (
    <Suspense>
      <Card sx={{ overflow: "visible", my: 3 }}>
        <MDBox p={3}>
          <MDTypography variant="h5" mb={2}>
            Nuevo Archivo
          </MDTypography>
          <Form apiUrl={apiUrl} />
        </MDBox>
      </Card>
    </Suspense>
  );
}
