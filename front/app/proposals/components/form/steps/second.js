"use client";

import { Grid, Autocomplete } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import { ErrorMessage } from "formik";

import { useEffect, useState } from "react";
import { show as getPartner } from "/actions/partners";
import { useSearchParams } from "next/navigation";

export default function Second({
  formData,
  staffs,
  countries,
  partners,
  proposal,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    staffAssigned,
    proposalTo,
    country,
    address,
    state,
    city,
    zip,
    contact,
    phone,
    partner,
  } = formField;
  const searchParams = useSearchParams();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const partnerId = params.get("partnerId");

    if (partnerId) {
      setFieldValue(partner.name, Number(partnerId));
    }
  }, [setFieldValue, partner.name, searchParams]);

  useEffect(() => {
    if (proposal) {
      setFieldValue(staffAssigned.name, proposal.staffAssignedId);
      setFieldValue(
        partner.name,
        proposal.proposableType == "customer" ? proposal.proposableId : null
      );
      setFieldValue(proposalTo.name, proposal.proposalTo ?? "");
      setFieldValue(country.name, proposal.countryId);
      setFieldValue(address.name, proposal.address ?? "");
      setFieldValue(city.name, proposal.city ?? "");
      setFieldValue(state.name, proposal.state ?? "");
      setFieldValue(zip.name, proposal.zip ?? "");
      setFieldValue(contact.name, proposal.contact?.id ?? "");
      setFieldValue(phone.name, proposal.phone ?? "");
      setFieldValue(contact.name, proposal.contact?.id ?? "");
      setContacts(proposal.proposable?.contacts ?? []);
    } else {
      getPartner(values.partner_id, { include: ["contacts"] }).then(
        (partner) => {
          setContacts(partner?.contacts ?? []);
          setFieldValue(proposalTo.name, partner.company ?? partner.name ?? "");
          setFieldValue(country.name, partner.countryId ?? "");
          setFieldValue(address.name, partner.address ?? "");
          setFieldValue(city.name, partner.city ?? "");
          setFieldValue(state.name, partner.state ?? "");
          setFieldValue(zip.name, partner.zip ?? "");
          setFieldValue(phone.name, partner.phoneNumber ?? "");
        }
      );
    }
  }, [
    proposal,
    values.partner_id,
    staffAssigned,
    partner,
    setFieldValue,
    proposalTo,
    country,
    address,
    city,
    state,
    zip,
    contact,
    phone,
  ]);
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => option.name}
          fieldName={partner.name}
          inputLabel={partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[staffAssigned.name]}
          options={staffs}
          optionLabel={(option) => option.name}
          fieldName={staffAssigned.name}
          inputLabel={staffAssigned.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[proposalTo.name]}
          name={proposalTo.name}
          label={proposalTo.label}
          type={proposalTo.type}
          placeholder={proposalTo.placeholder}
          error={errors[proposalTo.name] && touched[proposalTo.name]}
          success={
            values[proposalTo.name]?.length > 0 && !errors[proposalTo.name]
          }
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[address.name]}
          name={address.name}
          label={address.label}
          type={address.type}
          placeholder={address.placeholder}
          error={errors[address.name] && touched[address.name]}
          success={values[address.name]?.length > 0 && !errors[address.name]}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[city.name]}
          name={city.name}
          label={city.label}
          type={city.type}
          placeholder={city.placeholder}
          error={errors[city.name] && touched[city.name]}
          success={values[city.name]?.length > 0 && !errors[city.name]}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[state.name]}
          name={state.name}
          label={state.label}
          type={state.type}
          placeholder={state.placeholder}
          error={errors[state.name] && touched[state.name]}
          success={values[state.name]?.length > 0 && !errors[state.name]}
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

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[zip.name]}
          name={zip.name}
          label={zip.label}
          type={zip.type}
          placeholder={zip.placeholder}
          error={errors[zip.name] && touched[zip.name]}
          success={values[zip.name]?.length > 0 && !errors[zip.name]}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[contact.name]}
          options={contacts}
          optionLabel={(option) => `${option.name} - ${option.email}`}
          fieldName={contact.name}
          inputLabel={contact.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[phone.name]}
          name={phone.name}
          label={phone.label}
          type={phone.type}
          placeholder={phone.placeholder}
          error={errors[phone.name] && touched[phone.name]}
          success={values[phone.name]?.length > 0 && !errors[phone.name]}
        />
      </Grid>
    </Grid>
  );
}
