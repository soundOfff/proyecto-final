import React from "react";
import { Autocomplete } from "@mui/material";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";

export default function Select({
  options,
  optionLabel,
  fieldName,
  inputLabel,
  defaultValue,
  setFieldValue,
  ...rest
}) {
  return (
    <MDBox>
      <Autocomplete
        {...rest}
        onChange={(_, value) => setFieldValue(fieldName, value?.id ?? "")}
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option[optionLabel]}
        value={defaultValue}
        renderInput={(params) => (
          <>
            <MDInput
              {...params}
              variant="standard"
              label={inputLabel}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ ...params.inputProps }}
            />
          </>
        )}
      />
      <MDBox mt={0.75}>
        <MDTypography
          component="div"
          variant="caption"
          color="error"
          fontWeight="regular"
        >
          <ErrorMessage name={fieldName} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
