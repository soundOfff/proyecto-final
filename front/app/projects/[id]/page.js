import { show } from "/actions/projects";

import Card from "@mui/material/Card";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDAvatar from "/components/MDAvatar";

import DefaultItem from "/examples/Items/DefaultItem";
import { Divider, Grid } from "@mui/material";

import { setColor } from "/utils/project-state-colors";

import moneyFormat from "/utils/moneyFormat";

const include = [
  "staffs",
  "defendant",
  "plaintiff",
  "billingType",
  "serviceType",
  "status",
  "members.staff",
];

export default async function Show({ params }) {
  const project = await show(params.id, { include });

  return (
    <Card sx={{ px: 10, py: 5 }}>
      <Grid container mt={3} mb={5} lineHeight={0}>
        <Grid item xs={12} md={6}>
          <MDTypography
            variant="h4"
            textAlign="center"
            mr={5}
            display="inline-block"
            mb={{ xs: 5 }}
          >
            {project.name}
          </MDTypography>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="end">
          <MDBadge
            variant="gradient"
            color="dark"
            badgeContent={`Expediente ${project.expedient ?? ""}`}
            container
            sx={{ height: "40px", mr: 5 }}
          />
          <MDBadge
            variant="contained"
            badgeContent={`${project.status.label}`}
            color={setColor(project.status.label)}
            container
            sx={{ height: "40px" }}
          />
        </Grid>
      </Grid>

      <Grid container ml={2}>
        <Grid item xs={12} md={6} xxl={3} whiteSpace="nowrap">
          <DefaultItem
            color="dark"
            title="Costo"
            icon="monetization_on_outlined"
            description={moneyFormat(project.cost)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 0, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Creado"
            icon="date_range"
            description={project.createdAt}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Comienzo"
            icon="date_range"
            description={project.startDate}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Fin"
            icon="date_range"
            description={project.deadline}
          />
        </Grid>
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Demandado"
            description={project.defendant?.company}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Demandante"
            description={project.plaintiff?.company}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Facturación"
            description={project.billingType?.label}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Horas Estimadas"
            description={project.estimatedHours}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Servicio"
            description={project.serviceType?.label}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Abogado Principal"
            description={
              project.staffs.length > 0 &&
              project.staffs.at(-1)?.firstName +
                " " +
                project.staffs.at(-1)?.lastName
            }
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} mt={3}>
          <MDBox ml={2} mt={0.5} lineHeight={1.4}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              Descripción
            </MDTypography>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              textAlign="center"
            >
              {project.description}
            </MDTypography>
          </MDBox>
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} pl={2} mt={3}>
          <MDBox mt={0.5} lineHeight={1.4}>
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              mb={2}
            >
              Miembros Del Caso
            </MDTypography>
          </MDBox>
          {project.members.map((member) => (
            <MDBox key={member.id} display="inline-block" mr={2}>
              {member.staff.profileImage && (
                <MDAvatar
                  src={`/images/staff/${member.staff.profileImage}`}
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
              )}
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                mr={2}
              >
                {member.staff.firstName + " " + member.staff.lastName}
              </MDTypography>
            </MDBox>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}
