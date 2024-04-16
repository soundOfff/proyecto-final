import Form from "./form";
import { Card } from "@mui/material";
import MDBox from "/components/MDBox";

export default function Create() {
  return (
    <MDBox my={3}>
      <Card>
        <Form />
      </Card>
    </MDBox>
  );
}
