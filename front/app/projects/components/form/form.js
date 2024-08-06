"use client";

import { Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import Select from "/components/Select";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Partners from "./components/partners";
import { ErrorMessage } from "formik";
import form from "./schemas/form";
import { useEffect, useState } from "react";
import moment from "moment";

export default function FormComponent({
  formData,
  project,
  proposals,
  roles,
  partnerData,
  billingTypes,
  serviceTypes,
  statuses,
  members,
}) {
  const { values, errors, touched, setFieldValue } = formData;
  const { formField } = form;
  const {
    billablePartner,
    cost,
    billingType,
    status,
    expedient,
    startDate,
    deadline,
    serviceType,
    responsiblePersonId,
    selectedMembers,
    proposal,
    description,
    partners,
  } = formField;

  const partnerList = values[partners.name].map((partner) => {
    return {
      id: partner.id,
      name: partnerData.find((p) => p.id === partner.id).name,
      role: roles.find((role) => role.id === partner.role_id)?.label,
      owner: partnerData.find((p) => p.id === partner.owner_id)?.name,
    };
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowDatePicker(event.target.checked);
    if (!event.target.checked) {
      setFieldValue(deadline.name, "");
    }
  };

  useEffect(() => {
    if (project) {
      setFieldValue(cost.name, project.cost || "");
      setFieldValue(proposal.name, project.proposalId || "");
      /*  setFieldValue(estimatedHours.name, project.estimatedHours || ""); */
      setFieldValue(expedient.name, project.expedient || "");
      setFieldValue(billablePartner.name, project.billablePartnerId || "");
      setFieldValue(status.name, project.status.id);
      setFieldValue(serviceType.name, project.serviceType?.id || "");
      setFieldValue(billingType.name, project.billingType?.id || "");
      setFieldValue(
        responsiblePersonId.name,
        project.responsiblePerson?.id || ""
      );
      setFieldValue(selectedMembers.name, project.members);
      setFieldValue(
        startDate.name,
        moment(project.startDate).format("YYYY-MM-DD")
      );
      setFieldValue(deadline.name, project.deadline ?? "");
      setFieldValue(
        partners.name,
        project.partners.map((partner) => {
          return {
            ...partner,
            role_id: partner.role?.id,
            owner_id: partner.owner?.id,
          };
        })
      );
    }
  }, [
    project,
    cost,
    expedient,
    billablePartner,
    status,
    serviceType,
    billingType,
    responsiblePersonId,
    selectedMembers,
    startDate,
    deadline,
    partners,
    proposal,
    setFieldValue,
  ]);

  return (
    <MDBox p={5}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[billablePartner.name]}
            options={partnerData}
            optionLabel={(option) => option.name}
            fieldName={billablePartner.name}
            inputLabel={billablePartner.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            value={values[cost.name]}
            name={cost.name}
            label={cost.label}
            type={cost.type}
            placeholder={cost.placeholder}
            error={errors[cost.name] && touched[cost.name]}
            success={values[cost.name]?.length > 0 && !errors[cost.name]}
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
          <FormField
            value={values[expedient.name]}
            name={expedient.name}
            label={expedient.label}
            type={expedient.type}
            placeholder={expedient.placeholder}
            error={errors[expedient.name] && touched[expedient.name]}
            success={
              values[expedient.name]?.length > 0 && !errors[expedient.name]
            }
          />
        </Grid>
        <Grid item xs={12}>
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
          <MDDatePicker
            value={values[startDate.name]}
            onChange={(date) =>
              setFieldValue(
                startDate.name,
                moment(date[0]).format("YYYY-MM-DD")
              )
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
          <FormControlLabel
            control={
              <Checkbox
                checked={showDatePicker}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="¿El caso tiene fecha de entrega?"
          />
        </Grid>
        {showDatePicker && (
          <Grid item xs={12} sm={6}>
            <MDDatePicker
              value={values[deadline.name]}
              onChange={(date) =>
                setFieldValue(
                  deadline.name,
                  moment(date[0]).format("YYYY-MM-DD")
                )
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
        )}
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
            value={values[responsiblePersonId.name]}
            options={members}
            optionLabel={(option) => option.name}
            fieldName={responsiblePersonId.name}
            inputLabel={responsiblePersonId.label}
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
          <Select
            value={values[proposal.name]}
            options={proposals}
            optionLabel={(option) => option.name}
            fieldName={proposal.name}
            inputLabel={proposal.label}
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12}>
          <Partners
            {...{
              values,
              setFieldValue,
              project,
              partnerData,
              roles,
              partnerList,
              partners,
              description,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="end">
            <MDButton
              type="submit"
              variant="gradient"
              color="dark"
              sx={{ mr: 5 }}
            >
              Guardar
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
