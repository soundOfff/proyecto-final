import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Icon from "@mui/material/Icon";

export default function ReminderList({
  reminders = [],
  staffs,
  deleteReminder,
}) {
  return (
    <Grid item xs={12}>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {reminders.map((reminder, index) => (
            <MDBox
              key={index}
              component="li"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="grey-200"
              borderRadius="lg"
              p={3}
              mb={2}
            >
              <MDBox
                width="100%"
                display="flex"
                flexDirection="column"
                lineHeight={1}
              >
                <MDBox mb={2}>
                  <MDTypography variant="button" fontWeight="medium">
                    Para:{" "}
                    {
                      staffs.find((staff) => staff.id === reminder.staff_id)
                        ?.name
                    }
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="text"
                  >
                    Fecha: &nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {reminder.date}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="text"
                  >
                    Descripción: &nbsp;&nbsp;&nbsp;
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      textTransform="normal"
                    >
                      {reminder.description}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox mr={1}>
                <MDButton
                  variant="text"
                  color="error"
                  onClick={() => deleteReminder(index)}
                >
                  <Icon>delete</Icon>&nbsp;Borrar
                </MDButton>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Grid>
  );
}
