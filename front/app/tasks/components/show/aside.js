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
  Clear,
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
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
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
  const [assigneds, setAssigneds] = useState(
    task.assigneds.map((assigned) => {
      return {
        ...assigned,
        first_name: assigned.firstName,
        last_name: assigned.lastName,
      };
    })
  );
  const [followers, setFollowers] = useState(
    task.followers.map((follower) => {
      return {
        ...follower,
        name: follower.firstName + " " + follower.lastName,
      };
    })
  );

  const handleReminderDelete = (taskId, reminderId) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.id !== reminderId
    );
    setReminders(updatedReminders);
    update(taskId, {
      reminders: updatedReminders,
    });
  };

  const handleReminderSave = () => {
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
    update(task.id, {
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

  useEffect(() => {
    update(task.id, { assigneds: assigneds });
  }, [assigneds, task.id]);

  useEffect(() => {
    update(task.id, { followers: followers });
  }, [followers, task.id]);

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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MDBox display="flex">
              <StarHalf />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Estado:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="status">Estado</InputLabel>
              <Select
                value={statusId}
                label="Estado"
                onChange={(e) => setStatusId(e.target.value)}
                sx={{ height: "40px", width: "100%" }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <MDBox display="flex">
              <CalendarToday />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Fecha de Inicio:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <MDDatePicker
              value={startDate}
              onChange={(date) =>
                setStartDate(moment(date[0]).format("YYYY-MM-DD"))
              }
              sx={{ ml: 1, height: "40px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <MDBox display="flex">
              <Event />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Fecha de Vencimiento:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <MDDatePicker
              value={dueDate}
              onChange={(date) =>
                setDueDate(moment(date[0]).format("YYYY-MM-DD"))
              }
              sx={{ height: "40px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <MDBox display="flex">
              <FlashOn />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Prioridad:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
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
          </Grid>

          <Grid item xs={6}>
            <MDBox display="flex">
              <AccessTime />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Precio por Hora:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={hourlyRate}
              type="number"
              placeholder="Precio por Hora"
              onChange={(e) => setHourlyRate(e.target.value)}
              onBlur={() => update(task.id, { hourly_rate: hourlyRate })}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={6}>
            <MDBox display="flex">
              <CreditCard />
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="bold"
                ml={1}
              >
                Facturable:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <Switch
              checked={billable}
              onChange={(e) => setBillable(e.target.checked)}
            />
          </Grid>

          <Grid xs={12} my={2}>
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
          </Grid>

          <Divider sx={{ width: "100%" }} />

          <Grid xs={12}>
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
                  <Clear
                    color="error"
                    sx={{ cursor: "pointer", ml: 1 }}
                    onClick={() => handleReminderDelete(task.id, reminder.id)}
                  />
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
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
                  sx={{ height: "40px" }}
                  input={{ placeholder: "Fecha de Recordatorio" }}
                  onChange={(date) =>
                    setReminderDate(
                      moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
                    )
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
          </Grid>
          <Divider sx={{ width: "100%" }} />

          <Grid xs={12}>
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
            {task.taskable && task.taskable_type === PROJECT_TYPE ? (
              <Autocomplete
                multiple
                key="assigneds"
                value={assigneds}
                onChange={(_, newValues) => setAssigneds(newValues)}
                options={task.taskable.members}
                getOptionLabel={(option) =>
                  option.first_name + " " + option.last_name
                }
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="standard"
                    label="Asignar a"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ ...params.inputProps }}
                  />
                )}
              />
            ) : null}
          </Grid>
          <Divider sx={{ width: "100%" }} />

          <Grid xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              key="followers"
              value={followers}
              onChange={(_, newValues) => setFollowers(newValues)}
              options={staffs}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  label="Asignar a"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ ...params.inputProps }}
                />
              )}
            />
            <Divider sx={{ width: "100%" }} />
          </Grid>
        </Grid>
      </MDBox>
    </Grid>
  );
}
