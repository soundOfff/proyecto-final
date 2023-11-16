import { Grid } from "@mui/material";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import * as moment from "moment";

export default function Third({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { startDate, deadline } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            placeholder: "Fecha De Inicio",
            variant: "standard",
            fullWidth: true,
          }}
          onChange={(date) =>
            setFieldValue(startDate.name, moment(date[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={startDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            placeholder: "Fecha De Entrega",
            variant: "standard",
            fullWidth: true,
          }}
          onChange={(date) =>
            setFieldValue(deadline.name, moment(date[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={deadline.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
