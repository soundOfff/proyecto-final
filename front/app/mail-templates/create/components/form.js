"use client";
import { useEffect, useState } from "react";
import { Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";

import {
  allowedFields,
  getAll as getAllMailTemplates,
} from "/actions/mail-templates";

import { htmlToEditorState } from "/utils/parseEditorState";
import { editorStateToHtml } from "/utils/parseEditorState";

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
      console.log(String(values[groupId.name]));
      allowedFields({ model: String(values[groupId.name]) })
        .then((fields) => {
          setFields(fields);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [values[groupId.name]]);

  // useEffect(() => {
  //   if (values[event.name]) {
  //     getAllMailTemplates({
  //       "filter[event]": values[event.name],
  //       include: ["group", "lang"],
  //     }).then((mailTemplates) => {
  //       setMailTemplates(mailTemplates);
  //     });
  //   }
  // }, values[event.name]);

  useEffect(() => {
    if (values[body.name] != "") {
      const editorState = htmlToEditorState(values[body.name]);
      setEditorState(editorState);
    }
  }, [values[body.name], setEditorState]);

  useEffect(() => {
    const content = editorStateToHtml(editorState);
    setFieldValue(body.name, content);
  }, [editorState, values[body.name], setFieldValue]);

  const handleInputChange = (lang) => {
    const selectedMailTemplate = mailTemplates.find(
      (template) => template.lang.name === lang
    );

    if (!selectedMailTemplate) return;

    const editorSTate = htmlToEditorState(selectedMailTemplate.body);
    // Update UI
    setEditorState(editorSTate);
    // Update payload
    setFieldValue(body.name, selectedMailTemplate.body);
    setFieldValue(subject.name, selectedMailTemplate.subject);
    setFieldValue(lang.name, selectedMailTemplate.lang.id);
    setFieldValue(disabled.name, selectedMailTemplate.disabled);
    setFieldValue(formatted.name, selectedMailTemplate.formatted);
    setFieldValue(sendFrom.name, selectedMailTemplate.send_from);
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
            onInputChange={(val) => handleInputChange(val)}
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
