import { Divider, Grid, Tooltip } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDAvatar from "/components/MDAvatar";
import {
  AccessTime,
  CalendarToday,
  CreditCard,
  Event,
  FlashOn,
  Lock,
  StarHalf,
} from "@mui/icons-material";

export default function Aside({ task }) {
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
          <MDTypography variant="h6" ml={1} color="info">
            {task.status.name}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <CalendarToday />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Fecha de Inicio:
          </MDTypography>
          <MDTypography variant="body2" ml={1}>
            {task.start_date}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <Event />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Fecha de Vencimiento:
          </MDTypography>
          <MDTypography variant="body2" ml={1}>
            {task.due_date}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <FlashOn />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Prioridad:
          </MDTypography>
          <MDTypography variant="body2" ml={1}>
            {task.priority.name}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <AccessTime />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Precio por Hora:
          </MDTypography>
          <MDTypography variant="body2" ml={1}>
            ${task.hourly_rate}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" mt={2}>
          <CreditCard />
          <MDTypography variant="h6" fontWeight="bold" ml={1}>
            Facturable:
          </MDTypography>
          <MDTypography variant="body2" ml={1}>
            {task.billable ? "Si" : "No"}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" flexWrap="wrap" mt={2}>
          {task.tags.map((tag) => (
            <MDBadge
              key={tag.id}
              variant="gradient"
              color="dark"
              size="sm"
              badgeContent={tag.name}
              sx={{ mb: 1 }}
            />
          ))}
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
