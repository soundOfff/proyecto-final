"use client";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Switch,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import detailForm from "../schemas/detail-form";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import Select from "/components/Select";
import moment from "moment";
import { useEffect, useState } from "react";
import { PANAMA_ID } from "/utils/constants/countries";
import { getAll as getAllProvinces } from "/actions/provinces";
import { getAll as getAllDistricts } from "/actions/districts";
import { getAll as getAllJurisdictions } from "/actions/jurisdictions";

export default function PersonForm({
  countries,
  errors,
  values,
  touched,
  setFieldValue,
}) {
  const {
    formField: {
      person: {
        name,
        birthDate,
        expeditionDate,
        expirationDate,
        isMale,
        number,
        country,
        isConsolidator,
        nationality,
        birthPlace,
        state,
        city,
        district,
        jurisdiction,
        province,
        address,
        phone,
        email,
        isResidential,
        buildingNumber,
      },
    },
  } = detailForm;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);

  useEffect(() => {
    if (values.country_id === PANAMA_ID) {
      getAllProvinces().then((provinces) => {
        setProvinces(provinces);
      });
    } else {
      setFieldValue("province_id", "");
      setFieldValue("district_id", "");
      setFieldValue("jurisdiction_id", "");
    }
  }, [values.country_id, setFieldValue]);

  useEffect(() => {
    if (values.province_id) {
      getAllDistricts({ "filter[province_id]": values.province_id }).then(
        (districts) => {
          setDistricts(districts);
        }
      );
    }
  }, [values.province_id]);

  useEffect(() => {
    if (values.district_id) {
      getAllJurisdictions({ "filter[district_id]": values.district_id }).then(
        (jurisdictions) => {
          setJurisdictions(jurisdictions);
        }
      );
    }
  }, [values.district_id]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          label={name.label}
          placeholder={name.placeholder}
          name={name.name}
          type={name.type}
          error={errors.name && touched.name}
          success={name.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={number.label}
          placeholder={number.placeholder}
          name={number.name}
          type={number.type}
          error={errors.name && touched.name}
          success={number.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Nacimiento",
            InputLabelProps: { shrink: true },
          }}
          format="DD/MM/YYYY"
          value={values[birthDate.name]}
          onChange={(value) =>
            setFieldValue(birthDate.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={birthDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Expedición",
            InputLabelProps: { shrink: true },
          }}
          options={{ maxDate: moment().format("YYYY-MM-DD") }}
          value={values[expeditionDate.name]}
          onChange={(value) =>
            setFieldValue(
              expeditionDate.name,
              moment(value[0]).format("YYYY-MM-DD")
            )
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={expeditionDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Expiración",
            InputLabelProps: { shrink: true },
            sx: { mt: 4.4 },
          }}
          options={{ minDate: moment().format("YYYY-MM-DD") }}
          value={values[expirationDate.name]}
          onChange={(value) =>
            setFieldValue(
              expirationDate.name,
              moment(value[0]).format("YYYY-MM-DD")
            )
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={expirationDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="standard" fullWidth>
          <InputLabel>Género</InputLabel>
          <MuiSelect
            value={values[isMale.name]}
            label="Género"
            onChange={(e) => setFieldValue(isMale.name, e.target.value)}
            sx={{ height: "3rem" }}
          >
            <MenuItem value={1}>Masculino</MenuItem>
            <MenuItem value={0}>Femenino</MenuItem>
          </MuiSelect>
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              <ErrorMessage name={isMale.name} />
            </MDTypography>
          </MDBox>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[nationality.name]}
          options={countries}
          optionLabel={(option) => option.shortName}
          fieldName={nationality.name}
          inputLabel={nationality.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[birthPlace.name]}
          options={countries}
          optionLabel={(option) => option.shortName}
          fieldName={birthPlace.name}
          inputLabel={birthPlace.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          value={values[country.name]}
          options={countries}
          optionLabel={(option) => option.shortName}
          fieldName={country.name}
          inputLabel={country.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      {values[country.name] === PANAMA_ID ? (
        <>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[province.name]}
              options={provinces}
              optionLabel={(option) => option.name}
              fieldName={province.name}
              inputLabel={province.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[district.name]}
              options={districts}
              optionLabel={(option) => option.name}
              fieldName={district.name}
              inputLabel={district.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={values[jurisdiction.name]}
              options={jurisdictions}
              optionLabel={(option) => option.name}
              fieldName={jurisdiction.name}
              inputLabel={jurisdiction.label}
              setFieldValue={setFieldValue}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <FormField
              label={state.label}
              placeholder={state.placeholder}
              name={state.name}
              type={state.type}
              error={errors.name && touched.name}
              success={state.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={city.label}
              placeholder={city.placeholder}
              name={city.name}
              type={city.type}
              error={errors.name && touched.name}
              success={city.length > 0 && !errors.name}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={6}>
        <FormField
          label={address.label}
          placeholder={address.placeholder}
          name={address.name}
          type={address.type}
          error={errors.name && touched.name}
          success={address.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={phone.label}
          placeholder={phone.placeholder}
          name={phone.name}
          type={phone.type}
          value={values[phone.name]}
          error={errors.name && touched.name}
          success={phone.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={email.label}
          placeholder={email.placeholder}
          name={email.name}
          type={email.type}
          value={values[email.name]}
          error={errors.name && touched.name}
          success={email.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={buildingNumber.label}
          placeholder={buildingNumber.placeholder}
          name={buildingNumber.name}
          type={buildingNumber.type}
          value={values[buildingNumber.name]}
          error={errors.name && touched.name}
          success={buildingNumber.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="standard" sx={{ mt: -2.3 }} fullWidth>
          <InputLabel>{isResidential.label}</InputLabel>
          <MuiSelect
            value={values[isResidential.name]}
            label={isResidential.label}
            onChange={(e) => setFieldValue(isResidential.name, e.target.value)}
            sx={{ height: "3rem" }}
          >
            <MenuItem value={1}>Residencial</MenuItem>
            <MenuItem value={0}>Edificio</MenuItem>
          </MuiSelect>
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              <ErrorMessage name={isResidential.name} />
            </MDTypography>
          </MDBox>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="center">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[isConsolidator.name]}
                onChange={(e) =>
                  setFieldValue(isConsolidator.name, e.currentTarget.checked)
                }
              />
            }
            label={isConsolidator.label}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
