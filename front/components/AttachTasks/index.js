"use client";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import Table from "./components/table";

import { useEffect, useState } from "react";
import { getAll as getAllTasks } from "/actions/tasks";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { LINE_ITEM_TYPES } from "/utils/constants/lineItemTypes";

export default function AttachTasks({ formData, projectId }) {
  const {
    values: externalValues,
    formField,
    setFieldValue: setFieldValueExternal,
  } = formData;
  const { items } = formField;
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  const handleAddItems = () => {
    const mappedTasks = selectedTask
      .map((task) => {
        if (
          externalValues["items"].some(
            (item) => item.description === (task.name || `Tarea #${task.id}`)
          )
        ) {
          return null;
        }
        return {
          description: task.name ?? `Tarea #${task.id}`,
          rate: parseFloat(task.cost ?? 0),
          long_description: task.description,
          line_item_type_id: LINE_ITEM_TYPES.TASK,
          quantity: 1,
          taxes: [],
          discount: "",
          task_id: task.id,
          unit: "",
        };
      })
      .filter(Boolean);
    setFieldValueExternal(items.name, [
      ...externalValues.items,
      ...mappedTasks,
    ]);
  };

  useEffect(() => {
    const filters = {
      "filter[taskable_type]": PROJECT_TYPE,
      "filter[taskable_id]": projectId,
      "filter[not_in_line_item]": true,
      includeCost: true,
    };
    getAllTasks(filters).then((response) => {
      setTasks(response.data.tasks);
    });
  }, [projectId]);

  return (
    <MDBox>
      <MDBox
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h5" fontWeight="medium">
          Agregar Tareas
        </MDTypography>
        <MDButton
          onClick={handleAddItems}
          type="button"
          size="small"
          disabled={tasks.length === 0}
          color="success"
          sx={{ mt: 1.5 }}
        >
          Agregar como item
        </MDButton>
      </MDBox>
      <Table
        rows={tasks}
        formData={formData}
        setSelectedTasks={setSelectedTask}
      />
    </MDBox>
  );
}
