"use client";

import {
  Divider,
  Grid,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Autocomplete,
} from "@mui/material";
import {
  AccessTime,
  Add,
  CalendarToday,
  CreditCard,
  Event,
  FlashOn,
  Lock,
  Notifications,
  Remove,
  StarHalf,
} from "@mui/icons-material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDAvatar from "/components/MDAvatar";
import MDDatePicker from "/components/MDDatePicker";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { useState, useEffect } from "react";
import { getAll as getAllStatuses } from "/actions/ticket-statuses";
import { getAll as getAllPriorities } from "/actions/task-priorities";
import { getAll as getAllTags } from "/actions/tags";
import { select as getAllStaffs } from "/actions/staffs";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import { update } from "/actions/tasks";
import moment from "moment";

export default function Aside({ task }) {
  const [statusId, setStatusId] = useState(task.status.id);
  const [startDate, setStartDate] = useState(task.start_date);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [priorityId, setPriorityId] = useState(task.priority.id);
  const [hourlyRate, setHourlyRate] = useState(task.hourly_rate);
  const [billable, setBillable] = useState(task.billable);
  const [tags, setTags] = useState(task.tags);
  const [tagsData, setTagsData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminders, setReminders] = useState(task.reminders || []);
  const [reminderStaffId, setReminderStaffId] = useState(null);
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const handleReminderSave = async () => {
    setShowReminderForm(false);
    setReminders([
      ...reminders,
      {
        reminderable_id: task.id,
        reminderable_type: "task",
        date: reminderDate,
        description: reminderDescription,
        staff_id: reminderStaffId,
      },
    ]);
    await update(task.id, {
      reminders: [
        ...reminders,
        {
          reminderable_id: task.id,
          reminderable_type: "task",
          date: reminderDate,
          description: reminderDescription,
          staff_id: reminderStaffId,
        },
      ],
    });
    setReminderStaffId(null);
    setReminderDescription("");
    setReminderDate("");
  };

  useEffect(() => {
    getAllStatuses().then((statuses) => {
      setStatuses(statuses);
    });
    getAllPriorities().then((priorities) => {
      setPriorities(priorities);
    });
    getAllTags().then((tags) => {
      setTagsData(tags);
    });
    getAllStaffs().then((staffs) => {
      setStaffs(staffs);
    });
  }, []);

  useEffect(() => {
    update(task.id, { ticket_status_id: statusId });
  }, [statusId, task.id]);

  useEffect(() => {
    update(task.id, { start_date: startDate });
  }, [startDate, task.id]);

  useEffect(() => {
    update(task.id, { due_date: dueDate });
  }, [dueDate, task.id]);

  useEffect(() => {
    update(task.id, { task_priority_id: priorityId });
  }, [priorityId, task.id]);

  useEffect(() => {
    update(task.id, { billable: billable });
  }, [billable, task.id]);

  useEffect(() => {
    update(task.id, { tags: tags });
  }, [tags, task.id]);

  return (
    <Grid item xs={4}>
      <MDBox bgColor="light" px={5} py={2} height="100%">
        {task.recurring && (
          <>
            <MDBadge
              variant="contained"
              badgeContent="Tarea Recurrente"
              color="dark"
              size="xs"
              container
              sx={{ height: "2rem" }}
            />
            <Divider />
          </>
        )}

        <MDBox display="flex" mt={2}>
          <StarHalf />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Estado:
          </MDTypography>
          <FormControl sx={{ ml: 1 }}>
            <InputLabel id="status">Estado</InputLabel>
            <Select
              value={statusId}
              label="Estado"
              onChange={(e) => setStatusId(e.target.value)}
              sx={{ height: "40px" }}
            >
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <CalendarToday />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Fecha de Inicio:
          </MDTypography>
          <MDDatePicker
            value={startDate}
            onChange={(date) =>
              setStartDate(moment(date[0]).format("YYYY-MM-DD"))
            }
            sx={{ ml: 1, height: "40px" }}
          />
        </MDBox>

        <MDBox display="flex" mt={2}>
          <Event />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Fecha de Vencimiento:
          </MDTypography>
          <MDDatePicker
            value={dueDate}
            onChange={(date) =>
              setDueDate(moment(date[0]).format("YYYY-MM-DD"))
            }
            sx={{ ml: 1, height: "40px" }}
          />
        </MDBox>

        <MDBox display="flex" mt={2}>
          <FlashOn />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Prioridad:
          </MDTypography>
          <FormControl sx={{ ml: 1, width: "100px" }}>
            <InputLabel id="status">Prioridad</InputLabel>
            <Select
              value={priorityId}
              label="Estado"
              onChange={(e) => setPriorityId(e.target.value)}
              sx={{ height: "40px" }}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority.id} value={priority.id}>
                  {priority.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <AccessTime />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Precio por Hora:
          </MDTypography>
          <FormField
            value={hourlyRate}
            type="number"
            placeholder="Precio por Hora"
            onChange={(e) => setHourlyRate(e.target.value)}
            onBlur={() => update(task.id, { hourly_rate: hourlyRate })}
            sx={{ ml: 1, width: "100px" }}
          />
        </MDBox>

        <MDBox display="flex" mt={2}>
          <CreditCard />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Facturable:
          </MDTypography>
          <Switch
            checked={billable}
            onChange={(e) => setBillable(e.target.checked)}
          />
        </MDBox>

        <MDBox mt={1} mb={1}>
          <Autocomplete
            key="tags"
            multiple
            value={tags}
            onChange={(e, tagsSelected) => setTags(tagsSelected)}
            options={tagsData}
            getOptionLabel={(option) => option.name}
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
        </MDBox>

        <Divider />

        <MDBox>
          <MDBox display="flex" mt={2} mb={1}>
            <Notifications />
            <MDTypography variant="h6" fontWeight="bold" ml={1}>
              Recordatorios
            </MDTypography>
            {showReminderForm ? (
              <Remove
                color="error"
                onClick={() => setShowReminderForm(false)}
                sx={{ cursor: "pointer", ml: 1 }}
              />
            ) : (
              <Add
                color="success"
                onClick={() => setShowReminderForm(true)}
                sx={{ cursor: "pointer", ml: 1 }}
              />
            )}
          </MDBox>
          {reminders &&
            reminders.map((reminder) => (
              <MDBox key={reminder.id} display="flex">
                <MDTypography key={reminder.id} variant="body2">
                  {reminder.date}
                </MDTypography>
                <MDTypography key={reminder.id} variant="body2" ml={2}>
                  {reminder.description}
                </MDTypography>
              </MDBox>
            ))}
          {showReminderForm && (
            <MDBox display="flex" flexDirection="column" gap={5} mt={2}>
              <Autocomplete
                key="staff"
                value={
                  staffs.find((staff) => staff.id === reminderStaffId) || {
                    id: "",
                    name: "",
                  }
                }
                onChange={(_, newValue) => setReminderStaffId(newValue?.id)}
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
              />
              <MDDatePicker
                key="reminderDate"
                options={{ enableTime: true }}
                value={reminderDate}
                placeholder="Fecha a Notificar"
                sx={{ height: "40px" }}
                onChange={(date) =>
                  setReminderDate(moment(date[0]).format("YYYY-MM-DD HH:mm:ss"))
                }
              />
              <MDInput
                key="reminderDescription"
                value={reminderDescription}
                placeholder="Descripción"
                sx={{ height: "40px" }}
                onChange={(e) => setReminderDescription(e.target.value)}
              />
              <MDButton
                variant="gradient"
                color="dark"
                sx={{ ml: 1 }}
                onClick={handleReminderSave}
              >
                Guardar
              </MDButton>
            </MDBox>
          )}
        </MDBox>
        <Divider />

        <MDBox>
          <MDBox display="flex" mt={2} mb={1}>
            <Lock />
            <MDTypography variant="h6" fontWeight="bold" ml={1}>
              Comercial
            </MDTypography>
          </MDBox>
          {task.assigneds &&
            task.assigneds.map((assigned) => (
              <Tooltip key={assigned.id} title={assigned.name} arrow>
                <MDAvatar
                  src={`/images/staff/${assigned.profileImage}`}
                  alt="profile-image"
                  size="md"
                  shadow="sm"
                  sx={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
              </Tooltip>
            ))}
        </MDBox>
        <Divider />

        <MDBox>
          <MDBox display="flex" mt={2} mb={1}>
            <Lock />
            <MDTypography variant="h6" fontWeight="bold" ml={1}>
              Seguidores
            </MDTypography>
          </MDBox>
          {task.followers &&
            task.followers.map((follower) => (
              <Tooltip key={follower.id} title={follower.name} arrow>
                <MDAvatar
                  src={`/images/staff/${follower.profileImage}`}
                  alt="profile-image"
                  size="md"
                  shadow="sm"
                  sx={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginRight: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                />
              </Tooltip>
            ))}
        </MDBox>
        <Divider />
      </MDBox>
    </Grid>
  );
}
