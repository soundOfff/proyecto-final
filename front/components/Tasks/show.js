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
}) {
  const [staffs, setStaffs] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [notificationPriorities, setNotificationPriorities] = useState([]);
  const [tagsData, setTagsData] = useState([]);

  const selectedFork = task.isFinalTask
    ? getSelectedFork(task.procedure.process.forks)
    : null;

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
        <Grid container wrap="nowrap">
          <Content selectedFork={selectedFork} />
          <Aside />
        </Grid>
      </MDBox>
    </DataProvider>
  );
}
