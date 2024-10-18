"use client";
import { useEffect, useState } from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";

import { allowedFields } from "/actions/mail-templates";

import { editorStateToHtml } from "/utils/parseEditorState";
import { MAIL_TEMPLATE_GROUP } from "/utils/constants/mailTemplates";

export default function MailTemplateForm({
  langs,
  groups,
  formData,
  editorState,
  setEditorState,
  setFields,
}) {
  const { values, errors, touched, setFieldValue, formField } = formData;

  const {
    subject,
    name,
    sendFrom,
    disabled,
    event,
    formatted,
    body,
    groupId,
    lang,
  } = formField;

  const [mailTemplates, setMailTemplates] = useState([]);

  useEffect(() => {
    if (values[groupId.name]) {
      allowedFields({ model: MAIL_TEMPLATE_GROUP[values[groupId.name]] })
        .then((fields) => {
          setFields(fields);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [values[groupId.name]]);

  useEffect(() => {
    const content = editorStateToHtml(editorState);
    setFieldValue(body.name, content);
  }, [editorState, values[body.name], setFieldValue]);

  return (
    <MDBox p={4}>
      <Grid width="100%" container spacing={5}>
        <Grid item sm={12}>
          <FormField
            name={name.name}
            label={name.label}
            type={name.type}
            placeholder={name.placeholder}
            value={values[name.name]}
            error={errors.name && touched.name}
            success={name.length > 0 && !errors.name}
          />
        </Grid>
        <Grid item sm={12}>
          <FormField
            name={sendFrom.name}
            label={sendFrom.label}
            type={sendFrom.type}
            placeholder={sendFrom.placeholder}
            value={values[sendFrom.name]}
            error={errors.sendFrom && touched.sendFrom}
            success={sendFrom.length > 0 && !errors.sendFrom}
          />
        </Grid>
        <Grid item sm={12}>
          <Select
            value={values[lang.name]}
            options={langs}
            optionLabel={(option) => option.name}
            fieldName={lang.name}
            inputLabel={lang.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item sm={12}>
          <Select
            value={values[groupId.name]}
            options={groups}
            optionLabel={(option) => option.name}
            fieldName={groupId.name}
            inputLabel={groupId.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item sm={12}>
          <FormField
            name={subject.name}
            label={subject.label}
            type={subject.type}
            placeholder={subject.placeholder}
            value={values[subject.name]}
            error={errors.subject && touched.subject}
            success={subject.length > 0 && !errors.subject}
          />
        </Grid>
        <Grid item sm={12}>
          <FormField
            name={event.name}
            label={event.label}
            type={event.type}
            placeholder={event.placeholder}
            value={values[event.name]}
            error={errors.event && touched.event}
            success={event.length > 0 && !errors.event}
          />
        </Grid>
        <Grid item sm={12}>
          <MDTypography variant="button" color="text">
            Cuerpo del mensaje
          </MDTypography>
          <MDEditor
            editorStyle={{ minHeight: "20vh" }}
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </Grid>
        <Grid item sm={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={values[disabled.name]}
                  onChange={(e) =>
                    setFieldValue(disabled.name, e.target.checked)
                  }
                />
              }
              label={disabled.label}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={values[formatted.name]}
                  onChange={(e) =>
                    setFieldValue(formatted.name, e.target.checked)
                  }
                />
              }
              label={formatted.label}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </MDBox>
  );
}
