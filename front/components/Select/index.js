import React, { useMemo } from "react";
import { Autocomplete } from "@mui/material";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";

export default function Select({
  options,
  optionLabel,
  customOptionLabel,
  fieldName,
  inputLabel,
  value,
  onInputChange = () => {},
  setFieldValue,
  ...rest
}) {
  const valueMemoized = useMemo(
    () => options.find((option) => option.id === value),
    [options, value]
  );
  return (
    <MDBox>
      <Autocomplete
        {...rest}
        value={valueMemoized ?? null}
        onChange={(_, newValue) => setFieldValue(fieldName, newValue?.id ?? "")}
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option[optionLabel]}
        onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
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
