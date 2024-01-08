"use client";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import { ErrorMessage } from "formik";

// TODO: import serviceType, subServiceType

export default function First({
  formData,
  partners,
  serviceTypes,
  retainingAgents,
  subServiceTypes,
  labelsData,
  states,
  discountTypes,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    partner,
    number,
    dateFrom,
    dateTo,
    serviceType,
    retainingAgent,
    subServiceType,
    labels,
    currency,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, partnerSelected) =>
            setFieldValue(partner.name, partnerSelected?.id)
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
      <Grid item xs={12} sm={6}>
        <FormField
          name={number.name}
          label={number.label}
          type={number.type}
          placeholder={number.placeholder}
          error={errors.number && touched.number}
          success={number.length > 0 && !errors.number}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha desde proforma",
            InputLabelProps: { shrink: true },
          }}
          onChange={(value) =>
            setFieldValue(dateFrom.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={dateFrom.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de caducidad",
            InputLabelProps: { shrink: true },
          }}
          onChange={(value) =>
            setFieldValue(dateTo.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={dateTo.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, serviceTypeSelected) =>
            setFieldValue(serviceType.name, serviceTypeSelected?.id)
          }
          options={serviceTypes}
          getOptionLabel={(option) => option.company}
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
          onChange={(e, retainingAgentSelected) =>
            setFieldValue(retainingAgent.name, retainingAgentSelected?.id)
          }
          options={retainingAgents}
          getOptionLabel={(option) => option.company}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={retainingAgent.label}
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
            <ErrorMessage name={retainingAgent.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          onChange={(e, selectedLabel) =>
            setFieldValue(selectedLabel.name, selectedLabel?.id)
          }
          options={labelsData}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={labels.label}
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
            <ErrorMessage name={labels.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          onChange={(e, subServiceTypeSelected) =>
            setFieldValue(subServiceType.name, subServiceTypeSelected?.id)
          }
          options={subServiceTypes}
          getOptionLabel={(option) => option.company}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={subServiceType.label}
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
            <ErrorMessage name={subServiceType.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          defaultValue=" USD $"
          options={[" USD $"]}
          disabled
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={currency.label}
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
            <ErrorMessage name={currency.name} />
          </MDTypography>
        </MDBox>
      </Grid>
     
    </Grid>
  );
}
