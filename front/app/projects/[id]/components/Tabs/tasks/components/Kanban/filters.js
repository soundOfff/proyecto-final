"use client";

import MDBox from "/components/MDBox";
import { Autocomplete, ToggleButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAll as getPriorities } from "/actions/task-priorities";
import { select as selectStaff } from "/actions/staffs";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filters({ params, setParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()));
  const [priorities, setPriorities] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedPriorityId, setSelectedPriorityId] = useState(
    searchParams.get("priorityId") || null
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    searchParams.get("startDate")
      ? searchParams.get("startDate").split(",")
      : []
  );
  const [selectedDueDate, setSelectedDueDate] = useState(
    searchParams.get("dueDate") ? searchParams.get("dueDate").split(",") : []
  );
  const [selectedStaffId, setSelectedStaffId] = useState(
    searchParams.get("staffId") || null
  );
  const [isMyTasksSelected, setIsMyTasksSelected] = useState();

  const handleMyTasksChange = () => {
    if (!searchParams.get("myTasks")) {
      queryParams.set("myTasks", session.staff.id);
      setIsMyTasksSelected(true);
      setParams((prev) => ({
        ...prev,
        "filter[staff_id]": session.staff.id,
      }));
    } else {
      setIsMyTasksSelected(false);
      queryParams.delete("myTasks");
      const newParams = { ...params };
      delete newParams["filter[staff_id]"];
      setParams(newParams);
    }
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handlePriorityChange = (_, newValue) => {
    if (newValue) {
      setSelectedPriorityId(newValue.id);
      queryParams.set("priorityId", newValue.id);
      setParams((prev) => ({
        ...prev,
        "filter[task_priority_id]": newValue.id,
      }));
    } else {
      queryParams.delete("priorityId");
      setSelectedPriorityId(null);
      const newParams = { ...params };
      delete newParams["filter[task_priority_id]"];
      setParams(newParams);
    }
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handleSelectedStaffChange = (_, newValue) => {
    if (newValue) {
      setSelectedStaffId(newValue.id);
      queryParams.set("staffId", newValue.id);
      setParams((prev) => ({
        ...prev,
        "filter[staff_id]": newValue.id,
      }));
    } else {
      setSelectedStaffId(null);
      queryParams.delete("staffId");
      const newParams = { ...params };
      delete newParams["filter[staff_id]"];
      setParams(newParams);
    }
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handleStartDateChange = (value) => {
    setSelectedStartDate(value);
    if (value.length > 0) {
      const startDateFilter = moment(value[0]).format("YYYY-MM-DD");
      const endDateFilter = moment(value[1]).format("YYYY-MM-DD");
      queryParams.set("startDate", `${startDateFilter},${endDateFilter}`);
      setParams((prev) => ({
        ...prev,
        "filter[range_start_date]": `${startDateFilter},${endDateFilter}`,
      }));
    } else {
      queryParams.delete("startDate");
      const newParams = { ...params };
      delete newParams["filter[range_start_date]"];
      setParams(newParams);
    }
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handleDueDateChange = (value) => {
    setSelectedDueDate(value);
    if (value.length > 0) {
      const startDateFilter = moment(value[0]).format("YYYY-MM-DD");
      const endDateFilter = moment(value[1]).format("YYYY-MM-DD");
      queryParams.set("dueDate", `${startDateFilter},${endDateFilter}`);
      setParams((prev) => ({
        ...prev,
        "filter[range_due_date]": `${startDateFilter},${endDateFilter}`,
      }));
    } else {
      queryParams.delete("dueDate");
      const newParams = { ...params };
      delete newParams["filter[range_due_date]"];
      setParams(newParams);
    }
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    getPriorities().then((priorities) => {
      setPriorities(priorities);
    });
  }, []);

  useEffect(() => {
    selectStaff().then((staffs) => {
      setStaffs(staffs);
    });
  }, []);

  return (
    <MDBox display="flex" justifyContent="center" gap={5} pl={1} mt={2}>
      <ToggleButton
        value="check"
        selected={isMyTasksSelected}
        onChange={handleMyTasksChange}
      >
        Mis Tareas
      </ToggleButton>
      <Autocomplete
        value={priorities.find((p) => p.id == selectedPriorityId) || null}
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
      <Autocomplete
        value={staffs.find((s) => s.id == selectedStaffId) || null}
        options={staffs}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        onChange={handleSelectedStaffChange}
        renderInput={(params) => (
          <MDInput
            {...params}
            variant="standard"
            label="Abogado"
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
