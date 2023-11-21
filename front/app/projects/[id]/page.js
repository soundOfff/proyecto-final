import { show } from "/actions/projects";

import Card from "@mui/material/Card";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import DefaultItem from "/examples/Items/DefaultItem";
import { Divider, Grid } from "@mui/material";

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
      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Expediente"
            description={project.expedient}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Coste Total"
            description={moneyFormat(project.cost)}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Demandado"
            description={project.defendant.company}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Demandante"
            description={project.plaintiff.company}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Facturación"
            description={project.billingType.label}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Servicio"
            description={project.serviceType.label}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Fecha De Creación"
            description={project.createdAt}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Fecha De Inicio"
            description={project.startDate}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Fecha De Entrega"
            description={project.deadline}
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
            title="Abogado Principal"
            description={
              project.staffs.at(-1).firstName +
              " " +
              project.staffs.at(-1).lastName
            }
          />
        </Grid>
        <Grid xs={12} md={6} pl={2} mt={3}>
          <MDBox mt={0.5} lineHeight={1.4}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              Miembros Del Caso
            </MDTypography>
          </MDBox>
          {project.members.map((member) => (
            <MDTypography
              key={member.id}
              variant="button"
              fontWeight="regular"
              color="text"
              mr={2}
            >
              {member.staff.firstName + " " + member.staff.lastName}
            </MDTypography>
          ))}
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Estado"
            description={project.status.label}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Descripción"
            description={project.description}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
