"use client";

import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Switch,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/form";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import Select from "/components/Select";
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
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
        isMale,
        idNumber,
        country,
        nationality,
        birthPlace,
        occupation,
        civilStatus,
        state,
        city,
        district,
        jurisdiction,
        province,
        address,
        isConsolidator,
        phone,
        email,
        isResidential,
        buildingNumber,
      },
    },
  } = form;

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

  const idType = ["Cédula", "Pasaporte", "Carnet de Residente"];

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={4}>
        <FormField
          value={values[name.name]}
          label={name.label}
          placeholder={name.placeholder}
          name={name.name}
          type={name.type}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          disablePortal
          id="id-type-selector"
          options={idType}
          onChange={(event, newValue) => {
            setFieldValue("id_type", newValue);
          }}
          value={values[idType]}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={"Tipo de Identificación"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.idType && touched.idType)}
              helperText={touched.idType && errors.idType}
            />
          )}
        />
      </Grid>

      {/* <Grid item xs={12} sm={4}>
        <FormField
          value={values[idType.name]}
          label={idType.label}
          placeholder={idType.placeholder}
          name={idType.name}
          type={idType.type}
          error={errors[idType.name] && touched[idType.name]}
          success={values[idType.name]?.length > 0 && !errors[idType.name]}
        />
      </Grid> */}
      <Grid item xs={12} sm={4}>
        <FormField
          value={values[idNumber.name]}
          label={idNumber.label}
          placeholder={idNumber.placeholder}
          name={idNumber.name}
          type={idNumber.type}
          error={errors[idNumber.name] && touched[idNumber.name]}
          success={values[idNumber.name]?.length > 0 && !errors[idNumber.name]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={phone.label}
          placeholder={phone.placeholder}
          name={phone.name}
          type={phone.type}
          value={values[phone.name]}
          error={errors[phone.name] && touched[phone.name]}
          success={values[phone.name]?.length > 0 && !errors[phone.name]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          label={email.label}
          placeholder={email.placeholder}
          name={email.name}
          type={email.type}
          value={values[email.name]}
          error={errors[email.name] && touched[email.name]}
          success={values[email.name]?.length > 0 && !errors[email.name]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[civilStatus.name]}
          label={civilStatus.label}
          placeholder={civilStatus.placeholder}
          name={civilStatus.name}
          type={civilStatus.type}
          error={errors[civilStatus.name] && touched[civilStatus.name]}
          success={
            values[civilStatus.name]?.length > 0 && !errors[civilStatus.name]
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[occupation.name]}
          label={occupation.label}
          placeholder={occupation.placeholder}
          name={occupation.name}
          type={occupation.type}
          error={errors[occupation.name] && touched[occupation.name]}
          success={
            values[occupation.name]?.length > 0 && !errors[occupation.name]
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            backgroundColor: "black",
            fullWidth: true,
            label: "Fecha de Nacimiento",
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
            fullWidth: true,
            label: "Fecha de Expedición",
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
        <FormControl variant="standard" fullWidth>
          <InputLabel>Género</InputLabel>
          <MuiSelect
            value={values[isMale.name]}
            label="Género"
            onChange={(e) => setFieldValue(isMale.name, e.target.value)}
            sx={{ height: "2rem" }}
          >
            <MenuItem value={true}>Masculino</MenuItem>
            <MenuItem value={false}>Femenino</MenuItem>
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
          optionLabel={(option) => option.nationality}
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
      <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6} alignSelf="end" pb={0.75}>
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
              value={values[state.name]}
              label={state.label}
              placeholder={state.placeholder}
              name={state.name}
              type={state.type}
              error={errors[state.name] && touched[state.name]}
              success={values[state.name]?.length > 0 && !errors[state.name]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              value={values[city.name]}
              label={city.label}
              placeholder={city.placeholder}
              name={city.name}
              type={city.type}
              error={errors[city.name] && touched[city.name]}
              success={values[city.name]?.length > 0 && !errors[city.name]}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[address.name]}
          label={address.label}
          placeholder={address.placeholder}
          name={address.name}
          type={address.type}
          error={errors[address.name] && touched[address.name]}
          multiline
          rows={3}
          success={values[address.name]?.length > 0 && !errors[address.name]}
        />
      </Grid>
      <Grid item xs={12} sm={3} mb={0.75} alignSelf="end">
        <FormControl variant="standard" fullWidth>
          <InputLabel>{isResidential.label}</InputLabel>
          <MuiSelect
            value={values[isResidential.name]}
            label={isResidential.label}
            onChange={(e) => setFieldValue(isResidential.name, e.target.value)}
            sx={{ height: "3rem" }}
          >
            <MenuItem value={true}>Residencial</MenuItem>
            <MenuItem value={false}>Edificio</MenuItem>
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
      <Grid item xs={12} sm={3} alignSelf="end">
        <FormField
          label={buildingNumber.label}
          placeholder={buildingNumber.placeholder}
          name={buildingNumber.name}
          type={buildingNumber.type}
          value={values[buildingNumber.name]}
          error={errors[buildingNumber.name] && touched[buildingNumber.name]}
          success={
            values[buildingNumber.name]?.length > 0 &&
            !errors[buildingNumber.name]
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="end">
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
