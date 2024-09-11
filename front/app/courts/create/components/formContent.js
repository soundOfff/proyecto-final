"use client";

import MDDropzone from "/components/MDDropzone";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import Select from "/components/Select";
import form from "./schemas/form";
import {
  FILEABLE_TYPES,
  TASK_FILEABLE_TYPE,
  PROJECT_FILEABLE_TYPE,
  EXPENSE_FILEABLE_TYPE,
  PARTNER_FILEABLE_TYPE,
} from "/utils/constants/fileableTypes";
import { ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import {
  getAll as getAllProjects,
  show as getProject,
} from "/actions/projects";
import {
  getAll as getAllPartners,
  show as getPartner,
} from "/actions/partners";
import {
  getAll as getAllExpenses,
  show as getExpense,
} from "/actions/expenses";
import { getAll as getAllTasks, show as getTask } from "/actions/tasks";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { useSearchParams } from "next/navigation";

export default function FormContent({ values, setFieldValue, errors }) {
  const { formField } = form;
  const { file: fileField, fileableType, fileableId, path, name } = formField;
  const [relationOptions, setRelationOptions] = useState([]);
  const searchParams = useSearchParams();

  const getOptionLabel = (option) => {
    if (option?.company) return `#${option.id} | ${option.company}`;
    if (option?.label) return `#${option.id} | ${option.label}`;
    if (option?.name) return `#${option.id} | ${option.name}`;
  };

  const getRelationOptions = (fileableType) => {
    if (fileableType === PROJECT_FILEABLE_TYPE) {
      getAllProjects().then((data) => setRelationOptions(data.data.projects));
    }
    if (fileableType === PARTNER_FILEABLE_TYPE) {
      getAllPartners().then((data) => setRelationOptions(data));
    }
    if (fileableType === EXPENSE_FILEABLE_TYPE) {
      getAllExpenses().then((data) => setRelationOptions(data.data.expenses));
    }
    if (fileableType === TASK_FILEABLE_TYPE) {
      getAllTasks().then((data) => setRelationOptions(data.data.tasks));
    }
  };

  useEffect(() => {
    const getRelationSelected = (fileableType, fileableId) => {
      if (fileableType === PROJECT_FILEABLE_TYPE) {
        getProject(fileableId, { include: ["billablePartner", "tasks"] }).then(
          (project) => {
            if (project.billablePartner) {
              setFieldValue(
                path.name,
                `/partners/${project.billablePartner.id}/projects/${project.id}/`
              );
            } else {
              setFieldValue(path.name, `/projects/${project.id}/`);
            }
          }
        );
      }
      if (fileableType === PARTNER_FILEABLE_TYPE) {
        getPartner(fileableId).then((partner) => {
          setFieldValue(path.name, `/partners/${partner.id}/`);
        });
      }
      if (fileableType === EXPENSE_FILEABLE_TYPE) {
        getExpense(fileableId, {
          include: ["task", "partner", "project"],
        }).then((expense) => {
          if (expense.project && expense.task && expense.partner) {
            setFieldValue(
              path.name,
              `/partners/${expense.partner.id}/projects/${expense.project.id}/tasks/${expense.task.id}/expenses/${expense.id}/`
            );
          } else if (expense.project && expense.partner) {
            setFieldValue(
              path.name,
              `/partners/${expense.partner.id}/projects/${expense.project.id}/expenses/${expense.id}/`
            );
          } else if (expense.project && expense.task) {
            setFieldValue(
              path.name,
              `/projects/${expense.project.id}/tasks/${expense.task.id}/expenses/${expense.id}/`
            );
          } else if (expense.task && expense.partner) {
            setFieldValue(
              path.name,
              `/partners/${expense.partner.id}/tasks/${expense.task.id}/expenses/${expense.id}/`
            );
          } else {
            setFieldValue(path.name, `/expenses/${expense.id}/`);
          }
        });
      }
      if (fileableType === TASK_FILEABLE_TYPE) {
        getTask(fileableId, { include: ["partner", "taskable"] }).then(
          (task) => {
            if (task.partner && task.taskable) {
              setFieldValue(
                path.name,
                `/partners/${task.partner.id}/projects/${task.taskable.id}/tasks/${task.id}/`
              );
            } else if (task.partner) {
              setFieldValue(
                path.name,
                `/partners/${task.partner.id}/tasks/${task.id}/`
              );
            } else {
              setFieldValue(path.name, `/tasks/${task.id}/`);
            }
          }
        );
      }
    };

    if (values[fileableType.name]) {
      getRelationOptions(values[fileableType.name]);
      if (values[fileableId.name]) {
        getRelationSelected(values[fileableType.name], values[fileableId.name]);
      }
    }
  }, [values, fileableType, fileableId, setFieldValue, path]);

  const isFromAnotherSource =
    searchParams.get("projectId") ||
    searchParams.get("partnerId") ||
    searchParams.get("expenseId") ||
    searchParams.get("taskId");

  useEffect(() => {
    if (!values[fileableType.name]) {
      if (searchParams.get("projectId")) {
        setFieldValue(fileableType.name, PROJECT_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("projectId")));
      }
      if (searchParams.get("partnerId")) {
        setFieldValue(fileableType.name, PARTNER_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("partnerId")));
      }
      if (searchParams.get("expenseId")) {
        setFieldValue(fileableType.name, EXPENSE_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("expenseId")));
      }
      if (searchParams.get("taskId")) {
        setFieldValue(fileableType.name, TASK_FILEABLE_TYPE);
        setFieldValue(fileableId.name, Number(searchParams.get("taskId")));
      }
    }
  }, [searchParams, fileableId, fileableType, setFieldValue, values]);

  const options = useMemo(
    () => ({
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 1,
      url: "nourl",
      autoProcessQueue: false,
    }),
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mt={2}>
        <FormField
          name={court.name}
          label={court.label}
          type={court.type}
          placeholder="Nombre del archivo"
          value={values[court.name]}
          error={errors[court.name] && touched[court.name]}
          success={values[court.name]?.length > 0 && !errors[court.name]}
        />
      </Grid>
    </Grid>
  );
}
