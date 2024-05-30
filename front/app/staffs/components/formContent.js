import {
  Grid,
  Autocomplete,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Icon,
  Switch,
} from "@mui/material";

import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDBox from "/components/MDBox";

import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

import { Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";

export default function FormContent({ formData, staff = null }) {
  const { values, errors, touched, setFieldValue, isSubmitting, formField } =
    formData;
  const {
    admin,
    defaultLanguage,
    departments,
    email,
    emailSignature,
    facebook,
    firstName,
    hourlyRate,
    lastName,
    linkedin,
    password,
    phoneNumber,
    profileImage,
    skype,
    welcomeEmail,
  } = formField;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRefreshPassword = () => {
    setFieldValue(password.name, crypto.randomUUID(12).slice(-12));
  };

  useEffect(() => {
    if (staff) {
      setFieldValue(admin.name, staff.admin);
      setFieldValue(defaultLanguage.name, staff.defaultLanguage);
      setFieldValue(email.name, staff.email);
      setFieldValue(emailSignature.name, staff.emailSignature);
      setFieldValue(facebook.name, staff.facebook);
      setFieldValue(firstName.name, staff.firstName);
      setFieldValue(hourlyRate.name, staff.hourlyRate);
      setFieldValue(lastName.name, staff.lastName);
      setFieldValue(linkedin.name, staff.linkedin);
      setFieldValue(password.name, staff.password);
      setFieldValue(phoneNumber.name, staff.phoneNumber);
      setFieldValue(profileImage.name, staff.profileImage);
      setFieldValue(skype.name, staff.skype);
      setFieldValue(welcomeEmail.name, staff.welcomeEmail);
    }
  }, [staff, setFieldValue]);

  return (
    <MDBox sx={{ p: 5 }}>
      <Grid container lineHeight={0} spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField
            name={firstName.name}
            label={firstName.label}
            type="text"
            placeholder={firstName.placeholder}
            value={values[firstName.name]}
            error={errors.firstName && touched.firstName}
            success={firstName.length > 0 && !errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={lastName.name}
            label={lastName.label}
            type={lastName.type}
            placeholder={lastName.placeholder}
            value={values[lastName.name]}
            error={errors.lastName && touched.lastName}
            success={lastName.length > 0 && !errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={email.name}
            label={email.label}
            type={email.type}
            placeholder={email.placeholder}
            value={values[email.name]}
            error={errors.email && touched.email}
            success={email.length > 0 && !errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={phoneNumber.name}
            label={phoneNumber.label}
            type={phoneNumber.type}
            placeholder={phoneNumber.placeholder}
            value={values[phoneNumber.name]}
            error={errors.phoneNumber && touched.phoneNumber}
            success={phoneNumber.length > 0 && !errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={hourlyRate.name}
            label={hourlyRate.label}
            type="number"
            placeholder={hourlyRate.placeholder}
            value={values[hourlyRate.name]}
            error={errors.hourlyRate && touched.hourlyRate}
            success={hourlyRate.length > 0 && !errors.hourlyRate}
          />
        </Grid>
        <Grid item xs={4}>
          <FormField
            name={facebook.name}
            label={facebook.label}
            type={facebook.type}
            placeholder={facebook.placeholder}
            value={values[facebook.name]}
            error={errors.facebook && touched.facebook}
            success={facebook.length > 0 && !errors.facebook}
          />
        </Grid>
        <Grid item xs={4}>
          <FormField
            name={linkedin.name}
            label={linkedin.label}
            type={linkedin.type}
            placeholder={linkedin.placeholder}
            value={values[linkedin.name]}
            error={errors.linkedin && touched.linkedin}
            success={linkedin.length > 0 && !errors.linkedin}
          />
        </Grid>
        <Grid item xs={4}>
          <FormField
            name={skype.name}
            label={skype.label}
            type={skype.type}
            placeholder={skype.placeholder}
            value={values[skype.name]}
            error={errors.skype && touched.skype}
            success={skype.length > 0 && !errors.skype}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            value={values[defaultLanguage.name]}
            options={[]}
            optionLabel={(option) => option.name}
            fieldName={defaultLanguage.name}
            inputLabel={defaultLanguage.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={emailSignature.name}
            label={emailSignature.label}
            type={emailSignature.type}
            placeholder={emailSignature.placeholder}
            value={values[emailSignature.name]}
            error={errors.emailSignature && touched.emailSignature}
            success={emailSignature.length > 0 && !errors.emailSignature}
            multiline
            rows={4}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignContent="center"
          xs={12}
        >
          <Grid xs={11} item>
            <FormField
              name={password.name}
              label={password.label}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={password.placeholder}
              value={values[password.name]}
              error={errors.password && touched.password}
              success={password.length > 0 && !errors.password}
            />
          </Grid>
          <Grid xs={1} item display="flex" alignSelf="center" noWrap>
            <MDButton
              variant="gradient"
              color="dark"
              iconOnly
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              sx={{ mr: 2, ml: 2 }}
            >
              <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
            </MDButton>
            <MDButton
              variant="gradient"
              color="dark"
              onClick={handleRefreshPassword}
              iconOnly
              sx={{ mr: 2 }}
            >
              <Icon sx={{ fontWeight: "bold" }}>refresh</Icon>
            </MDButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MDBox>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={values[welcomeEmail.name]}
                    onChange={(e) =>
                      setFieldValue(welcomeEmail.name, e.target.checked)
                    }
                  />
                }
                label={welcomeEmail.label}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={values[admin.name]}
                    onChange={(e) =>
                      setFieldValue(admin.name, e.target.checked)
                    }
                  />
                }
                label={admin.label}
              />
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
