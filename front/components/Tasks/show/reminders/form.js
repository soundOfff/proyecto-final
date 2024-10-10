"use client";

import { useState } from "react";
import moment from "moment-timezone";
import { useDataProvider } from "/providers/DataProvider";

import {
  Grid,
  MenuItem,
  Select,
  InputLabel,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@mui/material";

import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

export default function ReminderForm({ handleReminderSave }) {
  const { notificationPriorities, staffs } = useDataProvider();

  const [reminderStaffId, setReminderStaffId] = useState(null);
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderPriorityId, setReminderPriorityId] = useState(1);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderCheck, setReminderCheck] = useState(false);

  const reminderStaff =
    staffs.find((staff) => staff.id == reminderStaffId) || null;

  const canReminderSave =
    reminderStaffId && reminderDate && reminderDescription;

  const handleCheckReminder = (e) => {
    setReminderCheck(e.target.checked);
    if (e.target.checked) {
      setReminderDate(
        moment()
          .add(5, "minutes")
          .tz("America/Panama")
          .format("YYYY-MM-DD HH:mm:ss")
      );
    } else {
      setReminderDate("");
    }
  };

  const saveReminder = () => {
    handleReminderSave({
      reminderDate,
      reminderDescription,
      reminderPriorityId,
      reminderStaffId,
    });
    clearFields();
  };

  const clearFields = () => {
    setReminderStaffId(null);
    setReminderDescription("");
    setReminderPriorityId(1);
    setReminderDate("");
    setReminderCheck(false);
  };

  return (
    <Grid container spacing={5} p={2}>
      <Grid item xs={12} mt={2}>
        <Autocomplete
          value={reminderStaff}
          onChange={(_, newValue) => setReminderStaffId(newValue?.id || null)}
          options={staffs}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Recordatorio Para"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ ...params.inputProps }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <span>{option.name}</span>
            </li>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <MDDatePicker
          value={reminderDate}
          input={{
            label: "Fecha de Recordatorio",
            fullWidth: true,
            disabled: reminderCheck,
          }}
          onChange={(date) =>
            setReminderDate(moment(date[0]).format("YYYY-MM-DD HH:mm:ss"))
          }
          options={{
            minDate: moment()
              .add(5, "minutes")
              .tz("America/Panama")
              .format("YYYY-MM-DD HH:mm:ss"),
            enableTime: true,
            position: "right top",
            static: true,
          }}
        />
        <FormGroup sx={{ height: "20px" }}>
          <FormControlLabel
            sx={{
              fontSize: "0.675rem !important",
            }}
            control={
              <Checkbox
                checked={reminderCheck}
                onChange={handleCheckReminder}
                name="reminder-check"
                size="small"
              />
            }
            label={
              <MDTypography variant="caption" fontWeight="medium" color="text">
                Enviar ahora
              </MDTypography>
            }
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <MDInput
          key="reminderDescription"
          value={reminderDescription}
          placeholder="Descripción"
          sx={{ height: "40px" }}
          fullWidth
          onChange={(e) => setReminderDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="status">Prioridad</InputLabel>
          <Select
            value={reminderPriorityId}
            label="Estado"
            onChange={(e) => setReminderPriorityId(e.target.value)}
            sx={{ height: "40px" }}
          >
            {notificationPriorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>
                {priority.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <MDButton
          variant="gradient"
          color="dark"
          sx={{ width: "100%" }}
          onClick={saveReminder}
          disabled={!canReminderSave}
        >
          Guardar
        </MDButton>
      </Grid>
    </Grid>
  );
}
