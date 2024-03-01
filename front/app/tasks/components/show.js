import { Grid } from "@mui/material";
import Header from "./show/header";
import Content from "./show/content";
import Aside from "./show/aside";
import MDBox from "/components/MDBox";

export default function Show({
  task,
  markAsCompleted,
  isTimerStarted,
  stopTimer,
  currentTimerId,
  startTimer, // TODO: continue from here
}) {
  return (
    <MDBox>
      <Header task={task} />
      <Grid container wrap="nowrap">
        <Content
          task={task}
          markAsCompleted={markAsCompleted}
          stopTimer={stopTimer}
          startTimer={startTimer}
          isTimerStarted={isTimerStarted}
          currentTimerId={currentTimerId}
        />
        <Aside task={task} />
      </Grid>
    </MDBox>
  );
}
