"use client";

import { Autocomplete, Grid } from "@mui/material";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";

export default function Second({
  formData,
  partners,
  statuses,
  serviceTypes,
  billingTypes,
  members,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { partner, status, serviceType, billingType, selectedMembers } =
    formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          onChange={(e, partnerSelected) =>
            setFieldValue(partner.name, partnerSelected.id)
          }
          options={partners}
          getOptionLabel={(option) => option.company}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={partner.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={partner.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          onChange={(e, statusSelected) =>
            setFieldValue(status.name, statusSelected.id)
          }
          options={statuses}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={status.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={status.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          onChange={(e, type) => setFieldValue(serviceType.name, type.id)}
          options={serviceTypes}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={serviceType.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={serviceType.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, type) => setFieldValue(billingType.name, type.id)}
          options={billingTypes}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={billingType.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={billingType.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          onChange={(e, members) =>
            setFieldValue(
              selectedMembers.name,
              members.map((member) => member.id)
            )
          }
          options={members}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Miembros Del Caso"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={selectedMembers.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
