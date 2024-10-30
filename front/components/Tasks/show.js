import { Grid } from "@mui/material";
import Header from "./show/header";
import Content from "./show/content";
import Aside from "./show/aside";
import MDBox from "/components/MDBox";
import { DataProvider } from "/providers/DataProvider";
import { useEffect, useState } from "react";

import { select as staffSelect } from "/actions/staffs";
import { getTaskStatus, getTaskPriorities } from "/actions/tasks";
import { getAll as getAllTags } from "/actions/tags";
import { getAllPriorities } from "/actions/notifications";
import Footer from "./show/footer";

export default function Show({
  task,
  currentTimerId,
  isTimerStarted,
  markAsCompleted,
  stopTimer,
  startTimer,
  getSelectedFork,
  isSaving,
  handleSaveTask,
  closeShowModal,
  project = null,
  refetch = () => {},
}) {
  const [staffs, setStaffs] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [notificationPriorities, setNotificationPriorities] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [statusId, setStatusId] = useState(task.status.id);
  const [startDate, setStartDate] = useState(task.start_date);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [priorityId, setPriorityId] = useState(task.priority.id);
  const [hourlyRate, setHourlyRate] = useState(task.hourly_rate);
  const [billable, setBillable] = useState(task.billable);
  const [assigneds, setAssigneds] = useState(task.assigneds);
  const [followers, setFollowers] = useState(task.followers);
  const [reminders, setReminders] = useState(task.reminders || []);

  const selectedFork = task.isFinalTask
    ? getSelectedFork(task.procedure.process.forks)
    : null;

  const saveTask = async () => {
    await handleSaveTask(task.id, {
      task_status_id: statusId,
      start_date: startDate,
      due_date: dueDate,
      task_priority_id: priorityId,
      hourly_rate: hourlyRate,
      billable,
      reminders,
      assigneds,
      followers,
    });
  };

  useEffect(() => {
    staffSelect().then((staffs) => setStaffs(staffs));
    getTaskStatus().then((statuses) => setStatuses(statuses));
    getTaskPriorities().then((priorities) => setPriorities(priorities));
    getAllTags().then((tags) => setTagsData(tags));
    getAllPriorities().then((priorities) =>
      setNotificationPriorities(priorities)
    );
  }, []);

  return (
    <DataProvider
      value={{
        task,
        project,
        currentTimerId,
        isTimerStarted,
        statuses,
        priorities,
        tagsData,
        staffs,
        markAsCompleted,
        stopTimer,
        startTimer,
        getSelectedFork,
        notificationPriorities,
        isSaving,
        handleSaveTask,
        closeShowModal,
      }}
    >
      <MDBox>
        <Header />
        <Grid container>
          <Content selectedFork={selectedFork} refetch={refetch} />
          <Aside
            {...{
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
            }}
          />
          <Footer saveTask={saveTask} />
        </Grid>
      </MDBox>
    </DataProvider>
  );
}
