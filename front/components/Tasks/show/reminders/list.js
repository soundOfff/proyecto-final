import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Clear from "@mui/icons-material/Clear";

export default function ReminderList({ handleReminderDelete, reminders }) {
  return (
    <>
      {reminders.map((reminder, index) => (
        <MDBox key={index} display="flex" alignItems="center">
          <MDTypography variant="button">{reminder.date}</MDTypography>
          <MDTypography variant="button" ml={2}>
            {reminder.description}
          </MDTypography>
          <Clear
            color="error"
            sx={{ cursor: "pointer", ml: 1 }}
            onClick={() => handleReminderDelete(index)}
          />
        </MDBox>
      ))}
    </>
  );
}
