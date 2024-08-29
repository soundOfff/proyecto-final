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
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/form";
import Checkbox from "/components/Checkbox";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
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
  partner,
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
        idType,
        civilStatus,
      },
    },
  } = form;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);

  const [nameChecked, setNameChecked] = useState(false);
  const [idNumberChecked, setIdNumberChecked] = useState(false);
  const [stateChecked, setStateChecked] = useState(false);
  const [cityChecked, setCityChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [occupationChecked, setOccupationChecked] = useState(false);
  const [addressChecked, setAddressChecked] = useState(false);

  useEffect(() => {
    if (partner) {
      setFieldValue(name.name, partner.name || "");

      setFieldValue(idNumber.name, partner.idNumber || "");

      setFieldValue(isMale.name, partner.isMale || false);
      setFieldValue(civilStatus.name, partner.civilStatus || "");
      setFieldValue(phone.name, partner.phone || "");
      if (partner.phone == "Desconocido") {
        setPhoneChecked(true);
      }
      setFieldValue(email.name, partner.email || "");
      if (partner.email == "Desconocido") {
        setEmailChecked(true);
      }
      setFieldValue(occupation.name, partner.occupation || "");
      if (partner.occupation == "Desconocido") {
        setOccupationChecked(true);
      }
      setFieldValue(birthDate.name, partner.birthDate || "");
      setFieldValue(expeditionDate.name, partner.expeditionDate || "");
      setFieldValue(idType.name, partner.idType || "");
      setFieldValue(nationality.name, partner.nationality || "");
      setFieldValue(birthPlace.name, partner.birthPlace || "");
      setFieldValue(country.name, partner.country_id || "");
      setFieldValue(state.name, partner.state || "");
      if (partner.state == "Desconocido") {
        setStateChecked(true);
      }
      setFieldValue(city.name, partner.city || "");
      if (partner.city == "Desconocido") {
        setCityChecked(true);
      }
      setFieldValue(district.name, partner.district || "");
      setFieldValue(jurisdiction.name, partner.jurisdiction || "");
      setFieldValue(province.name, partner.province || "");
      setFieldValue(address.name, partner.address || "");
    }
  }, [
    partner,
    setFieldValue,
    name,
    idNumber,
    isMale,
    civilStatus,
    phone,
    email,
    occupation,
    birthDate,
    expeditionDate,
    idType,
    nationality,
    birthPlace,
    country,
    state,
    city,
    district,
    jurisdiction,
    province,
    address,
  ]);

  useEffect(() => {
    if (partner) {
      if (partner.name == "Desconocido") {
        setNameChecked(true);
      }
      if (partner.idNumber == "Desconocido") {
        setIdNumberChecked(true);
      }
      if (partner.state == "Desconocido") {
        setStateChecked(true);
      }
      if (partner.city == "Desconocido") {
        setCityChecked(true);
      }
      if (partner.phone == "Desconocido") {
        setPhoneChecked(true);
      }
      if (partner.email == "Desconocido") {
        setEmailChecked(true);
      }
      if (partner.occupation == "Desconocido") {
        setOccupationChecked(true);
      }
      if (partner.address == "Desconocido") {
        setAddressChecked(true);
      }
    }
  }, [
    setFieldValue,
    partner,
    name,
    idNumber,
    state,
    city,
    phone,
    email,
    occupation,
    address,
  ]);

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

  const idTypes = ["Cédula", "Pasaporte", "Carnet de Residente", "Desconocido"];

  const [filteredCivilStatuses, setFilteredCivilStatuses] = useState([]);

  useEffect(() => {
    const civilStatusesMale = [
      "Soltero",
      "Casado",
      "Divorciado",
      "Viudo",
      "Desconocido",
    ];
    const civilStatusesFemale = [
      "Soltera",
      "Casada",
      "Divorciada",
      "Viuda",
      "Desconocida",
    ];
    const isMaleSelected = values.is_male;

    if (isMaleSelected) {
      setFilteredCivilStatuses(civilStatusesMale);
    } else {
      setFilteredCivilStatuses(civilStatusesFemale);
    }

    setFieldValue(civilStatus.name, "");
  }, [values.is_male, setFieldValue, civilStatus]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[name.name]}
          label={name.label}
          placeholder={name.placeholder}
          name={name.name}
          type={name.type}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
          disabled={nameChecked}
        />
        <Checkbox
          checked={nameChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(name.name, "Desconocido");
            } else {
              setFieldValue(name.name, "");
            }
            setNameChecked(e.target.checked);
          }}
          label="Desconocido"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Autocomplete
          disablePortal
          options={idTypes}
          onChange={(event, newValue) => {
            setFieldValue(idType.name, newValue);
          }}
          value={values[idType.name]}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={"Tipo de Identificación"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.id_type && touched.id_type)}
              helperText={touched.id_type && errors.id_type}
            />
          )}
        />
      </Grid>

      <Grid item xs={10} sm={6}>
        <FormField
          value={values[idNumber.name]}
          label={idNumber.label}
          placeholder={idNumber.placeholder}
          name={idNumber.name}
          type={idNumber.type}
          error={errors[idNumber.name] && touched[idNumber.name]}
          success={values[idNumber.name]?.length > 0 && !errors[idNumber.name]}
          disabled={idNumberChecked}
        />
        <Checkbox
          checked={idNumberChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(idNumber.name, "Desconocido");
            } else {
              setFieldValue(idNumber.name, "");
            }
            setIdNumberChecked(e.target.checked);
          }}
          label="Desconocido"
        />
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
        <Autocomplete
          disablePortal
          options={filteredCivilStatuses}
          onChange={(event, newValue) => {
            setFieldValue(civilStatus.name, newValue);
          }}
          value={values[civilStatus.name]}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={"Estado civil"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.civilStatuses && touched.civilStatuses)}
              helperText={touched.civilStatuses && errors.civilStatuses}
            />
          )}
        />
      </Grid>

      <Grid item xs={10} sm={6}>
        <FormField
          label={phone.label}
          placeholder={phone.placeholder}
          name={phone.name}
          type={phone.type}
          value={values[phone.name]}
          error={errors[phone.name] && touched[phone.name]}
          success={values[phone.name]?.length > 0 && !errors[phone.name]}
          disabled={phoneChecked}
        />
        <Checkbox
          checked={phoneChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(phone.name, "Desconocido");
            } else {
              setFieldValue(phone.name, "");
            }
            setPhoneChecked(e.target.checked);
          }}
          label="Desconocido"
        />
      </Grid>

      <Grid item xs={10} sm={6}>
        <FormField
          label={email.label}
          placeholder={email.placeholder}
          name={email.name}
          value={values[email.name]}
          error={errors[email.name] && touched[email.name]}
          success={values[email.name]?.length > 0 && !errors[email.name]}
          disabled={emailChecked}
        />
        <Checkbox
          checked={emailChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(email.name, "Desconocido");
            } else {
              setFieldValue(email.name, "");
            }

            setEmailChecked(e.target.checked);
          }}
          label="Desconocido"
        />
      </Grid>

      <Grid item xs={10} sm={6}>
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
          disabled={occupationChecked}
        />
        <Checkbox
          checked={occupationChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(occupation.name, "Desconocido");
            } else {
              setFieldValue(occupation.name, "");
            }
            setOccupationChecked(e.target.checked);
          }}
          label="Desconocido"
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
          options={{ maxDate: moment().format("YYYY-MM-DD"), allowInput: true }}
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
          <Grid item xs={10} sm={6}>
            <FormField
              value={values[state.name]}
              label={state.label}
              placeholder={state.placeholder}
              name={state.name}
              type={state.type}
              error={errors[state.name] && touched[state.name]}
              success={values[state.name]?.length > 0 && !errors[state.name]}
              disabled={stateChecked}
            />
            <Checkbox
              checked={stateChecked}
              handleChange={(e) => {
                if (e.target.checked) {
                  setFieldValue(state.name, "Desconocido");
                } else {
                  setFieldValue(state.name, "");
                }
                setStateChecked(e.target.checked);
              }}
              label="Desconocido"
            />
          </Grid>

          <Grid item xs={10} sm={6} alignSelf="end">
            <FormField
              value={values[city.name]}
              label={city.label}
              placeholder={city.placeholder}
              name={city.name}
              type={city.type}
              error={errors[city.name] && touched[city.name]}
              success={values[city.name]?.length > 0 && !errors[city.name]}
              disabled={cityChecked}
            />
            <Checkbox
              checked={cityChecked}
              handleChange={(e) => {
                if (e.target.checked) {
                  setFieldValue(city.name, "Desconocido");
                } else {
                  setFieldValue(city.name, "");
                }
                setCityChecked(e.target.checked);
              }}
              label="Desconocido"
            />
          </Grid>
        </>
      )}

      <Grid item xs={10} sm={6}>
        <FormField
          label={address.label}
          placeholder={address.placeholder}
          name={address.name}
          type={address.type}
          value={values[address.name]}
          error={errors[address.name] && touched[address.name]}
          success={values[address.name]?.length > 0 && !errors[address.name]}
          disabled={addressChecked}
        />
        <Checkbox
          checked={addressChecked}
          handleChange={(e) => {
            if (e.target.checked) {
              setFieldValue(address.name, "Desconocido");
            } else {
              setFieldValue(address.name, "");
            }
            setAddressChecked(e.target.checked);
          }}
          label="Desconocido"
        />
      </Grid>

      <Grid item xs={12} sm={6} mb={0.75} alignSelf="end">
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
