"use client";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";

export default function Second({
  formData,
  states,
  discountTypes,
  repeats,
  agents,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    stopPendingRemainder,
    state,
    reference,
    agent,
    repeat,
    discountType,
    note,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} mt={2}>
        <FormField
          name={reference.name}
          label={reference.label}
          type={reference.type}
          placeholder={reference.placeholder}
          error={errors.reference && touched.reference}
          success={reference.length > 0 && !errors.reference}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, selectedState) =>
            setFieldValue(state.name, selectedState?.id)
          }
          options={states}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={state.label}
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
            <ErrorMessage name={state.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, selectedDiscountType) =>
            setFieldValue(discountType.name, selectedDiscountType?.id)
          }
          options={discountTypes}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={discountType.label}
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
            <ErrorMessage name={discountType.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, repeatSelected) =>
            setFieldValue(repeat.name, repeatSelected?.id)
          }
          options={repeats}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={repeat.label}
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
            <ErrorMessage name={repeat.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          options={agents}
          optionLabel="name"
          fieldName={agent.name}
          inputLabel={agent.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={note.name}
          label={note.label}
          type={note.type}
          placeholder={note.placeholder}
          value={values[note.name]}
          error={errors.note && touched.note}
          success={note.length > 0 && !errors.note}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      setFieldValue(stopPendingRemainder.name, e.target.checked)
                    }
                    name={stopPendingRemainder.name}
                  />
                }
                label={stopPendingRemainder.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
    </Grid>
  );
}
