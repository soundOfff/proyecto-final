"use client";

import MDBox from "/components/MDBox";
import { Autocomplete, ToggleButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAll as getPriorities } from "/actions/task-priorities";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";

export default function Filters({ params, setParams, refetch }) {
  const { data: session } = useSession();
  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState([]);

  const isMyTasksSelected = Boolean(params["filter[staff_id]"]);

  const handleMyTasksChange = () => {
    if (isMyTasksSelected) {
      setParams((prev) => {
        delete prev["filter[staff_id]"];
        return prev;
      });
    } else {
      setParams((prev) => ({
        ...prev,
        "filter[staff_id]": session?.staff?.id,
      }));
    }
    refetch();
  };

  const handlePriorityChange = (_, newValue) => {
    setSelectedPriority(newValue);
    if (newValue) {
      setParams((prev) => ({
        ...prev,
        "filter[task_priority_id]": newValue.id,
      }));
    } else {
      setParams((prev) => {
        delete prev["filter[task_priority_id]"];
        return prev;
      });
    }
    refetch();
  };

  const handleStartDateChange = (value) => {
    setSelectedStartDate(value);
    if (value.length > 0) {
      setParams((prev) => ({
        ...prev,
        "filter[range_start_date]":
          moment(value[0]).format("YYYY-MM-DD") +
          "," +
          moment(value[1]).format("YYYY-MM-DD"),
      }));
    } else {
      setParams((prev) => {
        delete prev["filter[range_start_date]"];
        return prev;
      });
    }
    refetch();
  };

  const handleDueDateChange = (value) => {
    setSelectedStartDate(value);
    if (value.length > 0) {
      setParams((prev) => ({
        ...prev,
        "filter[range_due_date]":
          moment(value[0]).format("YYYY-MM-DD") +
          "," +
          moment(value[1]).format("YYYY-MM-DD"),
      }));
    } else {
      setParams((prev) => {
        delete prev["filter[range_due_date]"];
        return prev;
      });
    }
    refetch();
  };

  useEffect(() => {
    getPriorities().then((priorities) => {
      setPriorities(priorities);
    });
  }, []);

  return (
    <MDBox display="flex" justifyContent="end" gap={2} mt={-6}>
      <ToggleButton
        value="check"
        selected={isMyTasksSelected}
        onChange={handleMyTasksChange}
      >
        Mis Tareas
      </ToggleButton>
      <Autocomplete
        value={selectedPriority}
        options={priorities}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        onChange={handlePriorityChange}
        renderInput={(params) => (
          <MDInput
            {...params}
            variant="standard"
            label="Prioridad"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        )}
        sx={{ width: "200px" }}
      />
      <MDDatePicker
        input={{
          width: "200px",
          label: "Fecha De Inicio",
        }}
        format="DD/MM/YYYY"
        value={selectedStartDate}
        onClose={handleStartDateChange}
        options={{
          mode: "range",
        }}
      />
      <MDDatePicker
        input={{
          width: "200px",
          label: "Fecha De Fin",
        }}
        format="DD/MM/YYYY"
        value={selectedDueDate}
        onClose={handleDueDateChange}
        options={{
          mode: "range",
        }}
      />
    </MDBox>
  );
}
