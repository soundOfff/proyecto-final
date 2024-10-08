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
  Box,
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
  LabelImportant,
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
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { useDataProvider } from "/providers/DataProvider";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import { update } from "/actions/tasks";
import { useSession } from "next-auth/react";
import moment from "moment-timezone";

export default function Aside() {
  const {
    statuses,
    priorities,
    staffs,
    tagsData,
    task,
    notificationPriorities,
  } = useDataProvider();
  const [statusId, setStatusId] = useState(task.status.id);
  const [startDate, setStartDate] = useState(task.start_date);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [priorityId, setPriorityId] = useState(task.priority.id);
  const [hourlyRate, setHourlyRate] = useState(task.hourly_rate);
  const [billable, setBillable] = useState(task.billable);
  const [tags, setTags] = useState(task.tags);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminders, setReminders] = useState(task.reminders || []);
  const [reminderStaffId, setReminderStaffId] = useState(null);
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderPriorityId, setReminderPriorityId] = useState(1);
  const [reminderDate, setReminderDate] = useState("");
  const [assigneds, setAssigneds] = useState(task.assigneds);
  const [followers, setFollowers] = useState(task.followers);
  const { data: session } = useSession();

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
        notification_priority_id: reminderPriorityId,
        staff_id: reminderStaffId,
        creator: session?.staff?.id,
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
          notification_priority_id: reminderPriorityId,
          staff_id: reminderStaffId,
          creator: session?.staff?.id,
        },
      ],
    });
    setReminderStaffId(null);
    setReminderDescription("");
    setReminderPriorityId(1);
    setReminderDate("");
  };

  const canReminderSave = () => {
    return reminderStaffId && reminderDate && reminderDescription;
  };

  useEffect(() => {
    if (statusId != task.status.id) {
      update(task.id, { task_status_id: statusId });
    }
  }, [statusId, task.id, task.status.id]);

  useEffect(() => {
    if (startDate != task.start_date)
      update(task.id, { start_date: startDate });
  }, [startDate, task.id, task.start_date]);

  useEffect(() => {
    if (dueDate != task.due_date) {
      update(task.id, { due_date: dueDate });
    }
  }, [dueDate, task.id, task.due_date]);

  useEffect(() => {
    if (priorityId != task.priority_id) {
      update(task.id, { task_priority_id: priorityId });
    }
  }, [priorityId, task.id, task.priority_id]);

  useEffect(() => {
    if (billable != task.billable) {
      update(task.id, { billable: billable });
    }
  }, [billable, task.id, task.billable]);

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
    <Grid item xs={7} lg={5}>
      <MDBox bgColor="light" pr={2} pl={4} py={2} height="100%">
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

        <Grid container spacing={3}>
          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex" alignContent="center">
              <StarHalf />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Estado:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="status">Estado</InputLabel>
              <Select
                value={statusId}
                label="Estado"
                onChange={(e) => setStatusId(e.target.value)}
                disabled={task.isBlocked || !task.canChangeStatus}
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

          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex">
              <CalendarToday />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Fecha de Inicio:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
            <MDDatePicker
              value={startDate}
              onChange={(date) =>
                setStartDate(moment(date[0]).format("YYYY-MM-DD"))
              }
              sx={{
                ml: 1,
                height: "40px",
                "& .flatpickr-calendar": {
                  left: "-100px !important",
                },
              }}
            />
          </Grid>

          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex">
              <Event />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Fecha de Vencimiento:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
            <MDDatePicker
              value={dueDate}
              onChange={(date) =>
                setDueDate(moment(date[0]).format("YYYY-MM-DD"))
              }
              sx={{ height: "40px" }}
            />
          </Grid>

          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex">
              <FlashOn />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Prioridad:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
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

          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex">
              <AccessTime />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Precio por Hora:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
            <FormField
              value={hourlyRate}
              type="number"
              placeholder="Precio por Hora"
              onChange={(e) => setHourlyRate(e.target.value)}
              onBlur={() => update(task.id, { hourly_rate: hourlyRate })}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item lg={6} md={12} my="auto">
            <MDBox display="flex">
              <CreditCard />
              <MDTypography
                display="inline"
                variant="button"
                fontWeight="bold"
                ml={1}
              >
                Facturable:
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item lg={6} md={12}>
            <Switch
              checked={billable}
              onChange={(e) => setBillable(e.target.checked)}
            />
          </Grid>

          <Divider sx={{ width: "100%" }} />

          <Grid xs={12} my={2} mx={2}>
            <MDTypography variant="button" fontWeight="bold" ml={1} mb={2}>
              <LabelImportant sx={{ mr: 1 }} />
              Etiquetas
            </MDTypography>
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

          <Grid xs={12} mx={3}>
            <MDBox display="flex" mt={2} mb={1}>
              <Notifications />
              <MDTypography variant="button" fontWeight="bold" ml={1}>
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
                  <MDTypography key={reminder.id} variant="button">
                    {reminder.date}
                  </MDTypography>
                  <MDTypography key={reminder.id} variant="button" ml={2}>
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
                  value={reminderDate}
                  input={{
                    label: "Fecha de Recordatorio",
                  }}
                  onChange={(date) =>
                    setReminderDate(
                      moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
                    )
                  }
                  options={{
                    minDate: moment()
                      .tz("America/Panama")
                      .format("YYYY-MM-DD HH:mm:ss"),
                    enableTime: true,
                    position: "right top",
                    static: true,
                  }}
                />
                <MDInput
                  key="reminderDescription"
                  value={reminderDescription}
                  placeholder="Descripción"
                  sx={{ height: "40px" }}
                  onChange={(e) => setReminderDescription(e.target.value)}
                />
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

                <MDButton
                  variant="gradient"
                  color="dark"
                  sx={{ ml: 1 }}
                  onClick={handleReminderSave}
                  disabled={!canReminderSave()}
                >
                  Guardar
                </MDButton>
              </MDBox>
            )}
          </Grid>
          <Divider sx={{ width: "100%" }} />

          <Grid xs={12} mx={3}>
            <MDBox display="flex" mt={2} mb={1}>
              <Lock />
              <MDTypography variant="button" fontWeight="bold" ml={1}>
                Responsables
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
                options={task.taskable.members.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
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
            ) : null}
          </Grid>
          <Divider sx={{ width: "100%" }} />

          <Grid xs={12} mx={3}>
            <MDBox display="flex" mt={2} mb={1}>
              <Lock />
              <MDTypography variant="button" fontWeight="bold" ml={1}>
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
