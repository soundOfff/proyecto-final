"use client";

import moment from "moment-timezone";

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
  CalendarToday,
  CreditCard,
  Event,
  FlashOn,
  Lock,
  StarHalf,
} from "@mui/icons-material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDAvatar from "/components/MDAvatar";
import MDDatePicker from "/components/MDDatePicker";
import MDInput from "/components/MDInput";
import { useState } from "react";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { useDataProvider } from "/providers/DataProvider";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

import Reminders from "./reminders";

export default function Aside({
  statusId,
  setStatusId,
  startDate,
  setStartDate,
  dueDate,
  setDueDate,
  priorityId,
  setPriorityId,
  hourlyRate,
  setHourlyRate,
  billable,
  setBillable,
  assigneds,
  setAssigneds,
  followers,
  setFollowers,
  reminders,
  setReminders,
}) {
  const { statuses, priorities, staffs, task } = useDataProvider();

  return (
    <Grid item xs={4}>
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

        <Grid container spacing={3} height="100%">
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

          {statusId !== DONE_STATUS_ID && (
            <Reminders
              statusId={statusId}
              reminders={reminders}
              setReminders={setReminders}
            />
          )}

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
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <span>{option.name}</span>
                </li>
              )}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Grid>
  );
}
