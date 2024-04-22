"use client";

import { Autocomplete, Grid } from "@mui/material";
import MDDatePicker from "/components/MDDatePicker";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import { ErrorMessage } from "formik";
import form from "./schemas/form";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import moment from "moment";
import { useEffect, useState } from "react";
import { getAll as getAllTags } from "/actions/tags";

export default function FormContent({
  values,
  errors,
  touched,
  setFieldValue,
  project,
  taskId,
}) {
  const { formField } = form;
  const { note, endTime, staff, startTime, task, tags } = formField;
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    setFieldValue(task.name, taskId);
  }, [task, setFieldValue, taskId]);

  useEffect(() => {
    getAllTags().then((tags) => {
      setTagsData(tags);
    });
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          key="startTime"
          options={{ enableTime: true }}
          value={values[startTime.name]}
          sx={{ height: "40px" }}
          input={{ placeholder: startTime.label }}
          onChange={(date) =>
            setFieldValue(
              startTime.name,
              moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
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
            <ErrorMessage name={startTime.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          key="endTime"
          options={{ enableTime: true }}
          value={values[endTime.name]}
          sx={{ height: "40px" }}
          input={{ placeholder: endTime.label }}
          onChange={(date) =>
            setFieldValue(
              endTime.name,
              moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
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
            <ErrorMessage name={endTime.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={note.name}
          label={note.label}
          type={note.type}
          placeholder={note.placeholder}
          error={errors.note && touched.note}
          success={note.length > 0 && !errors.note}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          value={values[staff.name]}
          options={project.members}
          optionLabel={(option) => option.name}
          fieldName={staff.name}
          inputLabel={staff.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          value={values[tags.name]}
          onChange={(e, tagsSelected) => setFieldValue(tags.name, tagsSelected)}
          options={tagsData}
          getOptionLabel={(option) => {
            console.log(option);
            return option.name;
          }}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={tags.label}
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
            <ErrorMessage name={tags.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
