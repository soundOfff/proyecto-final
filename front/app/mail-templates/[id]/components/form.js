"use client";
import { useEffect } from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";

import { show as getMailTemplate } from "/actions/mail-templates";

import { htmlToEditorState } from "/utils/parseEditorState";
import { editorStateToHtml } from "/utils/parseEditorState";

export default function MailTemplateForm({
  mailTemplate,
  langs,
  formData,
  editorState,
  setEditorState,
}) {
  const { values, errors, touched, setFieldValue, formField } = formData;

  const { subject, name, sendFrom, disabled, formatted, event, body, lang } =
    formField;

  useEffect(() => {
    setFieldValue(name.name, mailTemplate.name);
    setFieldValue(subject.name, mailTemplate.subject);
    setFieldValue(sendFrom.name, mailTemplate.send_from);
    setFieldValue(body.name, mailTemplate.body);
    setFieldValue(disabled.name, mailTemplate.disabled);
    setFieldValue(formatted.name, mailTemplate.formatted);
    setFieldValue(event.name, mailTemplate.event);
    setFieldValue(body.name, mailTemplate.body);
    setFieldValue(lang.name, mailTemplate.lang.id);
  }, [
    mailTemplate,
    name,
    subject,
    sendFrom,
    body,
    disabled,
    formatted,
    event,
    setFieldValue,
  ]);

  useEffect(() => {
    const editorState = htmlToEditorState(mailTemplate.body);
    setEditorState(editorState);
  }, [mailTemplate, setEditorState]);

  useEffect(() => {
    const content = editorStateToHtml(editorState);
    setFieldValue(body.name, content);
  }, [editorState, body, setFieldValue]);

  const handleInputChange = async (lang) => {
    // TODO: Make backend endpoint to get the correspond mail template by lang and name or slug and then update subject and body
    // const mailTemplate = await getMailTemplate(lang.id, {
    //   include: ["group", "lang"],
    // });
    // setFieldValue(subject.name, mailTemplate.subject);
    // setFieldValue(body.name, mailTemplate.body);
  };

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
            disabled
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
            onInputChange={(val) => {
              console.log(val);
            }}
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
