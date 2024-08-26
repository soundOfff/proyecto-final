"use client";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Switch,
  Select as MuiSelect,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "../schemas/form";
import Select from "/components/Select";
import Checkbox from "/components/Checkbox";
import { PANAMA_ID } from "/utils/constants/countries";
import { useEffect, useState } from "react";
import { getAll as getAllProvinces } from "/actions/provinces";
import { getAll as getAllDistricts } from "/actions/districts";
import { getAll as getAllJurisdictions } from "/actions/jurisdictions";
import RelatedPersonFormComponent from "./related-person-form";

export default function JuridicalForm({
  partner,
  countries,
  consolidators,
  sections,
  industries,
  notJuridicEntities,
  partnerTypes,
  errors,
  values,
  touched,
  setFieldValue,
  isRequired,
}) {
  const {
    formField: {
      juridical: {
        company,
        state,
        city,
        consolidator,
        isConsolidator,
        country,
        district,
        jurisdiction,
        province,
        industry,
        zip,
        email,
        address,
        document,
        section,
        isResidential,
        phone,
        fileNumber,
        imageNumber,
        rollNumber,
        ruc,
        dv,
        relatedPartners,
      },
    },
  } = form;
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);

  const [companyChecked, setCompanyChecked] = useState(false);
  const [documentChecked, setDocumentChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [stateChecked, setStateChecked] = useState(false);
  const [cityChecked, setCityChecked] = useState(false);
  const [addressChecked, setAddressChecked] = useState(false);
  const [zipChecked, setZipChecked] = useState(false);
  const [fileNumberChecked, setFileNumberChecked] = useState(false);
  const [imageNumberChecked, setImageNumberChecked] = useState(false);
  const [rucChecked, setRucChecked] = useState(false);
  const [dvChecked, setDvChecked] = useState(false);
  const [rollNumberChecked, setRollNumberChecked] = useState(false);

  useEffect(() => {
    if (partner) {
      setFieldValue(company.name, partner.company || "");
      setFieldValue(industry.name, partner.industryId || "");
      setFieldValue(section.name, partner.sectionId || "");
      setFieldValue(document.name, partner.document || "");
      setFieldValue(phone.name, partner.phone || "");
      setFieldValue(email.name, partner.email || "");
      setFieldValue(country.name, partner.countryId || "");
      setFieldValue(province.name, partner.provinceId || "");
      setFieldValue(district.name, partner.districtId || "");
      setFieldValue(jurisdiction.name, partner.jurisdictionId || "");
      setFieldValue(state.name, partner.state || "");
      setFieldValue(city.name, partner.city || "");
      setFieldValue(address.name, partner.address || "");
      setFieldValue(isResidential.name, partner.isResidential || false);
      setFieldValue(zip.name, partner.zip || "");
      setFieldValue(consolidator.name, partner.consolidatorId || "");
      setFieldValue(fileNumber.name, partner.fileNumber || "");
      setFieldValue(rollNumber.name, partner.rollNumber || "");
      setFieldValue(imageNumber.name, partner.imageNumber || "");
      setFieldValue(ruc.name, partner.ruc || "");
      setFieldValue(dv.name, partner.dv.toString() || "");
      setFieldValue(
        relatedPartners.name,
        partner.relatedPartners?.map((relatedPartner) => ({
          related_partner_id: relatedPartner.pivot.related_partner_id,
          partner_type_id: relatedPartner.pivot.partner_type_id,
          start_date: relatedPartner.pivot.start_date,
          end_date: relatedPartner.pivot.end_date,
          active: relatedPartner.pivot.active,
        })) || []
      );
    }
  }, [
    partner,
    setFieldValue,
    company,
    industry,
    section,
    document,
    phone,
    email,
    country,
    province,
    district,
    jurisdiction,
    state,
    city,
    address,
    isResidential,
    zip,
    consolidator,
    fileNumber,
    rollNumber,
    imageNumber,
    ruc,
    dv,
    relatedPartners,
  ]);

  useEffect(() => {
    if (partner) {
      if (partner.company === "Desconocido") {
        setCompanyChecked(true);
      }
      if (partner.document === "Desconocido") {
        setDocumentChecked(true);
      }
      if (partner.phone === "Desconocido") {
        setPhoneChecked(true);
      }
      if (partner.email === "Desconocido") {
        setEmailChecked(true);
      }
      if (partner.state === "Desconocido") {
        setStateChecked(true);
      }
      if (partner.city === "Desconocido") {
        setCityChecked(true);
      }
      if (partner.address === "Desconocido") {
        setAddressChecked(true);
      }
      if (partner.zip === "Desconocido") {
        setZipChecked(true);
      }
      if (partner.fileNumber === "Desconocido") {
        setFileNumberChecked(true);
      }
      if (partner.rollNumber === "Desconocido") {
        setRollNumberChecked(true);
      }
      if (partner.imageNumber === "Desconocido") {
        setImageNumberChecked(true);
      }
      if (partner.ruc === "Desconocido") {
        setRucChecked(true);
      }
      if (partner.dv === "Desconocido") {
        setDvChecked(true);
      }
    }
  }, [partner]);

  useEffect(() => {
    return () => {
      setFieldValue(company.name, "");
    };
  }, [setFieldValue, company]);

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
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} sm={6}>
          <FormField
            value={values[company.name]}
            isImportant={isRequired}
            label={company.label}
            placeholder={company.placeholder}
            name={company.name}
            type={company.type}
            error={errors[company.name] && touched[company.name]}
            success={values[company.name]?.length > 0 && !errors[company.name]}
            disabled={companyChecked}
          />
          <Checkbox
            checked={companyChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(company.name, "Desconocido");
              } else {
                setFieldValue(company.name, "");
              }
              setCompanyChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            value={values[industry.name]}
            options={industries}
            optionLabel={(option) => option.label}
            fieldName={industry.name}
            inputLabel={industry.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[section.name]}
            options={sections}
            optionLabel={(option) => option.label}
            fieldName={section.name}
            inputLabel={section.label}
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            isImportant={isRequired}
            value={values[document.name]}
            label={document.label}
            name={document.name}
            type={document.type}
            error={errors[document.name] && touched[document.name]}
            success={
              values[document.name]?.length > 0 && !errors[document.name]
            }
            disabled={documentChecked}
          />
          <Checkbox
            checked={documentChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(document.name, "Desconocido");
              } else {
                setFieldValue(document.name, "");
              }
              setDocumentChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            isImportant={isRequired}
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
            isImportant={isRequired}
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
            isImportant={isRequired}
            value={values[address.name]}
            label={address.label}
            placeholder={address.placeholder}
            name={address.name}
            type={address.type}
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

        <Grid item xs={12} sm={6} alignSelf="end" mb={1.5}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>{isResidential.label}</InputLabel>
            <MuiSelect
              value={values[isResidential.name]}
              label={isResidential.label}
              onChange={(e) =>
                setFieldValue(isResidential.name, e.target.value)
              }
              sx={{ height: "3rem" }}
            >
              <MenuItem value={true}>Residencial</MenuItem>
              <MenuItem value={false}>Edificio</MenuItem>
            </MuiSelect>
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} alignSelf="end">
          <FormField
            value={values[zip.name]}
            label={zip.label}
            name={zip.name}
            type={zip.type}
            error={errors[zip.name] && touched[zip.name]}
            success={values[zip.name]?.length > 0 && !errors[zip.name]}
            disabled={zipChecked}
          />
          <Checkbox
            checked={zipChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(zip.name, "Desconocido");
              } else {
                setFieldValue(zip.name, "");
              }
              setZipChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            value={values[consolidator.name]}
            options={consolidators}
            optionLabel={(option) => option.mergedName}
            fieldName={consolidator.name}
            inputLabel={consolidator.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={10} sm={6}>
          <FormField
            label={fileNumber.label}
            placeholder={fileNumber.placeholder}
            name={fileNumber.name}
            type={fileNumber.type}
            value={values[fileNumber.name]}
            error={errors[fileNumber.name] && touched[fileNumber.name]}
            success={
              values[fileNumber.name]?.length > 0 && !errors[fileNumber.name]
            }
            disabled={fileNumberChecked}
          />
          <Checkbox
            checked={fileNumberChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(fileNumber.name, "Desconocido");
              } else {
                setFieldValue(fileNumber.name, "");
              }
              setFileNumberChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            label={rollNumber.label}
            placeholder={rollNumber.placeholder}
            name={rollNumber.name}
            type={rollNumber.type}
            value={values[rollNumber.name]}
            error={errors[rollNumber.name] && touched[rollNumber.name]}
            success={
              values[rollNumber.name]?.length > 0 && !errors[rollNumber.name]
            }
            disabled={rollNumberChecked}
          />
          <Checkbox
            checked={rollNumberChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(rollNumber.name, "Desconocido");
              } else {
                setFieldValue(rollNumber.name, "");
              }
              setRollNumberChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            label={imageNumber.label}
            placeholder={imageNumber.placeholder}
            name={imageNumber.name}
            type={imageNumber.type}
            value={values[imageNumber.name]}
            error={errors[imageNumber.name] && touched[imageNumber.name]}
            success={
              values[imageNumber.name]?.length > 0 && !errors[imageNumber.name]
            }
            disabled={imageNumberChecked}
          />
          <Checkbox
            checked={imageNumberChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(imageNumber.name, "Desconocido");
              } else {
                setFieldValue(imageNumber.name, "");
              }
              setImageNumberChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            label={ruc.label}
            name={ruc.name}
            type={ruc.type}
            isImportant={isRequired}
            value={values[ruc.name]}
            error={errors[ruc.name] && touched[ruc.name]}
            success={values[ruc.name]?.length > 0 && !errors[ruc.name]}
            disabled={rucChecked}
          />
          <Checkbox
            checked={rucChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(ruc.name, "Desconocido");
              } else {
                setFieldValue(ruc.name, "");
              }
              setRucChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid item xs={10} sm={6}>
          <FormField
            label={dv.label}
            placeholder={dv.placeholder}
            name={dv.name}
            isImportant={isRequired}
            type={dv.type}
            value={values[dv.name]}
            error={errors[dv.name] && touched[dv.name]}
            success={values[dv.name]?.length > 0 && !errors[dv.name]}
            disabled={dvChecked}
          />
          <Checkbox
            checked={dvChecked}
            handleChange={(e) => {
              if (e.target.checked) {
                setFieldValue(dv.name, "Desconocido");
              } else {
                setFieldValue(dv.name, "");
              }
              setDvChecked(e.target.checked);
            }}
            label="Desconocido"
          />
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
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
              label={consolidator.label}
            />
          </FormGroup>
        </Grid>
        <RelatedPersonFormComponent
          setFieldValue={setFieldValue}
          values={values}
          partnerTypes={partnerTypes}
          countries={countries}
          notJuridicalEntities={notJuridicEntities}
        />
      </Grid>
    </>
  );
}
