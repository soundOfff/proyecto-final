import React from "react";

import FormField from "./form-field";

import { Grid } from "@mui/material";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import moment from "moment";

export default function OwnerPersonInputs({ formData }) {
  const { formField, values, errors, setFieldValue } = formData;
  const { seat, legalCircuit, checkIn, deed, deedDate, notary, sheet } =
    formField;
  return (
    <>
      <Grid item xs={12} sm={3}>
        <FormField
          name={seat.name}
          label={seat.label}
          type={seat.type}
          setFieldValue={setFieldValue}
          value={values[seat.name]}
          error={errors[seat.name] && touched[seat.name]}
          success={values[seat.name]?.length > 0 && !errors[seat.name]}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormField
          name={legalCircuit.name}
          label={legalCircuit.label}
          setFieldValue={setFieldValue}
          type={legalCircuit.type}
          value={values[legalCircuit.name]}
          error={errors[legalCircuit.name] && touched[legalCircuit.name]}
          success={
            values[legalCircuit.name]?.length > 0 && !errors[legalCircuit.name]
          }
        />
      </Grid>
      <Grid xs={12} sm={3} item>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Entrada",
          }}
          format="DD/MM/YYYY"
          value={values[checkIn.name]}
          onChange={(value) =>
            setFieldValue(checkIn.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[checkIn.name]}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={3}>
        <FormField
          name={notary.name}
          label={notary.label}
          setFieldValue={setFieldValue}
          type={notary.type}
          value={values[notary.name]}
          error={errors[notary.name] && touched[notary.name]}
          success={values[notary.name]?.length > 0 && !errors[notary.name]}
        />
      </Grid>
      <Grid item xs={3}>
        <FormField
          name={sheet.name}
          label={sheet.label}
          setFieldValue={setFieldValue}
          type={sheet.type}
          value={values[sheet.name]}
          error={errors[sheet.name] && touched[sheet.name]}
          success={values[sheet.name]?.length > 0 && !errors[sheet.name]}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormField
          name={deed.name}
          label={deed.label}
          setFieldValue={setFieldValue}
          type={deed.type}
          value={values[deed.name]}
          error={errors[deed.name] && touched[deed.name]}
          success={values[deed.name]?.length > 0 && !errors[deed.name]}
        />
      </Grid>
      <Grid xs={12} sm={3} item>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha de escritura",
          }}
          format="DD/MM/YYYY"
          value={values[deedDate.name]}
          onChange={(value) =>
            setFieldValue(deedDate.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[deedDate.name]}
          </MDTypography>
        </MDBox>
      </Grid>
    </>
  );
}