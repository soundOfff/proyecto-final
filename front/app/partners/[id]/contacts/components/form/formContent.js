"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Switch from "/components/Switch";
import MDButton from "/components/MDButton";
import NotificationEmails from "./components/notification-emails";
import Permissions from "./components/permissions";
import { useEffect } from "react";
import form from "./schemas/form";

export default function FormContent({
  contact,
  values,
  errors,
  setFieldValue,
  isSubmitting,
  touched,
}) {
  const { formField } = form;
  const {
    partner,
    firstName,
    lastName,
    title,
    email,
    phoneNumber,
    isPrimary,
    ticketEmails,
    contractEmails,
    creditNoteEmails,
    estimateEmails,
    invoiceEmails,
    permissions,
    projectEmails,
    taskEmails,
  } = formField;

  useEffect(() => {
    if (contact) {
      setFieldValue(partner.name, contact.partnerId ?? "");
      setFieldValue(firstName.name, contact.firstName ?? "");
      setFieldValue(lastName.name, contact.lastName ?? "");
      setFieldValue(title.name, contact.title ?? "");
      setFieldValue(email.name, contact.email ?? "");
      setFieldValue(phoneNumber.name, contact.phoneNumber ?? "");
      setFieldValue(isPrimary.name, contact.isPrimary ?? "");
      setFieldValue(permissions.name, contact.permissions ?? []);
      setFieldValue(ticketEmails.name, contact.ticketEmails ?? false);
      setFieldValue(contractEmails.name, contact.contractEmails ?? false);
      setFieldValue(creditNoteEmails.name, contact.creditNoteEmails ?? false);
      setFieldValue(estimateEmails.name, contact.estimateEmails ?? false);
      setFieldValue(invoiceEmails.name, contact.invoiceEmails ?? false);
      setFieldValue(projectEmails.name, contact.projectEmails ?? false);
      setFieldValue(taskEmails.name, contact.taskEmails ?? false);
    }
  }, [
    contact,
    partner,
    firstName,
    lastName,
    title,
    email,
    phoneNumber,
    isPrimary,
    ticketEmails,
    contractEmails,
    creditNoteEmails,
    estimateEmails,
    invoiceEmails,
    permissions,
    projectEmails,
    taskEmails,
    setFieldValue,
  ]);

  return (
    <MDBox sx={{ px: 2, pt: 3 }}>
      <Grid container lineHeight={0} spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField
            name={firstName.name}
            label={firstName.label}
            type={firstName.type}
            placeholder={firstName.placeholder}
            value={values[firstName.name]}
            error={errors[firstName.name] && touched[firstName.name]}
            success={
              values[firstName.name]?.length > 0 && !errors[firstName.name]
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={lastName.name}
            label={lastName.label}
            type={lastName.type}
            placeholder={lastName.placeholder}
            value={values[lastName.name]}
            error={errors[lastName.name] && touched[lastName.name]}
            success={
              values[lastName.name]?.length > 0 && !errors[lastName.name]
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={email.name}
            label={email.label}
            type={email.type}
            placeholder={email.placeholder}
            value={values[email.name]}
            error={errors[email.name] && touched[email.name]}
            success={values[email.name]?.length > 0 && !errors[email.name]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={title.name}
            label={title.label}
            type={title.type}
            placeholder={title.placeholder}
            value={values[title.name]}
            error={errors[title.name] && touched[title.name]}
            success={values[title.name]?.length > 0 && !errors[title.name]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={phoneNumber.name}
            label={phoneNumber.label}
            type={phoneNumber.type}
            placeholder={phoneNumber.placeholder}
            value={values[phoneNumber.name]}
            error={errors[phoneNumber.name] && touched[phoneNumber.name]}
            success={
              values[phoneNumber.name]?.length > 0 && !errors[phoneNumber.name]
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={isPrimary.name}
            label={isPrimary.label}
            value={values[isPrimary.name]}
            onChange={(e) => setFieldValue(isPrimary.name, e.target.checked)}
          />
        </Grid>
      </Grid>

      <Permissions values={values} setFieldValue={setFieldValue} />

      <NotificationEmails values={values} setFieldValue={setFieldValue} />
      <MDBox display="flex" justifyContent="end" my={2}>
        <MDButton
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="dark"
        >
          Guardar
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
