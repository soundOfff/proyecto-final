"use client";

import { Autocomplete, Divider, Grid } from "@mui/material";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Select from "/components/Select";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import PartnerForm from "../partnerForm";
import PartnerList from "../partnerList";

export default function Second({
  formData,
  project,
  partners: partnerData,
  statuses,
  serviceTypes,
  billingTypes,
  members,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    defendant,
    plaintiff,
    status,
    serviceType,
    billingType,
    responsiblePersonId,
    selectedMembers,
    startDate,
    deadline,
    partners,
  } = formField;

  useEffect(() => {
    if (project) {
      setFieldValue(defendant.name, project.defendant.id || "");
      setFieldValue(plaintiff.name, project.plaintiff?.id || "");
      setFieldValue(status.name, project.status.id);
      setFieldValue(serviceType.name, project.serviceType?.id || "");
      setFieldValue(billingType.name, project.billingType?.id || "");
      setFieldValue(
        responsiblePersonId.name,
        project.responsiblePerson?.id || ""
      );
      setFieldValue(selectedMembers.name, project.members);
      setFieldValue(startDate.name, project.startDate);
      setFieldValue(deadline.name, project.deadline ?? "");
      setFieldValue(partners.name, project.partners);
    }
  }, [
    project,
    defendant,
    plaintiff,
    status,
    serviceType,
    billingType,
    responsiblePersonId,
    selectedMembers,
    startDate,
    deadline,
    partners,
    setFieldValue,
  ]);

  const [defendants, setDefendants] = useState(partnerData);
  const [plaintiffs, setPlaintiffs] = useState(partnerData);

  const partnersSelected = values[partners.name]?.map((partner) => {
    return {
      id: partner.id,
      name: partnerData.find((p) => p.id === partner.id).name,
      role: partner.role,
    };
  });

  useEffect(() => {
    if (values[defendant.name]) {
      setPlaintiffs(
        partnerData.filter((partner) => partner.id !== values[defendant.name])
      );
    }
  }, [partnerData, values, defendant]);

  useEffect(() => {
    if (values[plaintiff.name]) {
      setDefendants(
        partnerData.filter((partner) => partner.id !== values[plaintiff.name])
      );
    }
  }, [partnerData, values, plaintiff]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[plaintiff.name]}
          options={plaintiffs}
          optionLabel={(option) => option.name}
          fieldName={plaintiff.name}
          inputLabel={plaintiff.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[defendant.name]}
          options={defendants}
          optionLabel={(option) => option.name}
          fieldName={defendant.name}
          inputLabel={defendant.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[status.name]}
          options={statuses}
          optionLabel={(option) => option.label}
          fieldName={status.name}
          inputLabel={status.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[serviceType.name]}
          options={serviceTypes}
          optionLabel={(option) => option.label}
          fieldName={serviceType.name}
          inputLabel={serviceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[billingType.name]}
          options={billingTypes}
          optionLabel={(option) => option.label}
          fieldName={billingType.name}
          inputLabel={billingType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[responsiblePersonId.name]}
          options={members}
          optionLabel={(option) => option.name}
          fieldName={responsiblePersonId.name}
          inputLabel={responsiblePersonId.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          value={values[selectedMembers.name]}
          onChange={(e, members) =>
            setFieldValue(selectedMembers.name, members)
          }
          options={members}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Miembros Del Caso"
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
            <ErrorMessage name={selectedMembers.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          value={values[startDate.name]}
          onChange={(date) =>
            setFieldValue(startDate.name, moment(date[0]).format("YYYY-MM-DD"))
          }
          input={{
            label: "Fecha De Inicio",
            fullWidth: true,
          }}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={startDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          value={values[deadline.name]}
          onChange={(date) =>
            setFieldValue(deadline.name, moment(date[0]).format("YYYY-MM-DD"))
          }
          input={{
            label: "Fecha De Entrega",
            fullWidth: true,
          }}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={deadline.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <PartnerForm {...{ values, setFieldValue, partnerData }} />
      <PartnerList
        partners={partnersSelected}
        setFieldValue={setFieldValue}
        partnerField={partners}
        values={values}
      />
    </Grid>
  );
}