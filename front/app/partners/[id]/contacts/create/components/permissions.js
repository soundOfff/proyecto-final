"use client";

import { Grid, Autocomplete } from "@mui/material";
import { ErrorMessage } from "formik";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import form from "../schemas/form";
import { useEffect, useState } from "react";
import { getAll as getAllPermissions } from "/actions/permissions";

export default function Permissions({ values, setFieldValue }) {
  const { formField } = form;
  const { permissions } = formField;
  const [permissionsData, setPermissionData] = useState([]);

  useEffect(() => {
    getAllPermissions().then((data) => setPermissionData(data));
  }, []);

  return (
    <Grid item xs={12}>
      <Autocomplete
        multiple
        value={values[permissions.name]}
        onChange={(e, permissionsSelected) =>
          setFieldValue(permissions.name, permissionsSelected)
        }
        options={permissionsData}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <MDInput
            {...params}
            variant="standard"
            label={permissions.label}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ my: 2 }}
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
          <ErrorMessage name={permissions.name} />
        </MDTypography>
      </MDBox>
    </Grid>
  );
}
