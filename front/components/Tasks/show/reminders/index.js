"use client";
import { useSession } from "next-auth/react";
import { update } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import { useState } from "react";

import ReminderList from "./list";
import ReminderForm from "./form";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { Divider, Grid } from "@mui/material";

import { Notifications, Add, Remove } from "@mui/icons-material";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

export default function Reminders({ statusId, reminders, setReminders }) {
  const { data: session } = useSession();
  const { task } = useDataProvider();

  const [showReminderForm, setShowReminderForm] = useState(false);

  const handleReminderDelete = (reminderId) => {
    const updatedReminders = reminders.filter(
      (reminder, index) => index !== reminderId
    );
    setReminders(updatedReminders);
    update(task.id, {
      reminders: updatedReminders,
    });
  };

  const handleReminderSave = ({
    reminderDate,
    reminderDescription,
    reminderPriorityId,
    reminderStaffId,
  }) => {
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
  };

  return (
    <Grid xs={12} mx={3}>
      {statusId !== DONE_STATUS_ID && (
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
      )}
      {reminders && (
        <ReminderList
          handleReminderDelete={handleReminderDelete}
          reminders={reminders}
        />
      )}
      {showReminderForm && (
        <ReminderForm handleReminderSave={handleReminderSave} />
      )}
      <Divider sx={{ width: "100%" }} />
    </Grid>
  );
}
