"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";

export default function FormField({
  label,
  name,
  errors,
  touched,
  box,
  ...rest
}) {
  return (
    <MDBox mb={1.5} {...box}>
      <MDInput
        {...rest}
        name={name}
        variant="standard"
        label={label}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <MDBox mt={0.75}>
        <MDTypography
          component="div"
          variant="caption"
          color="error"
          fontWeight="regular"
        >
          {errors[name] && touched[name] ? errors[name] : null}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
