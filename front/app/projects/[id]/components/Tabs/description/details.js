import UpdateMembers from "./update-members";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

import DefaultItem from "/examples/Items/DefaultItem";
import { Divider, Grid, Step, StepLabel, Stepper } from "@mui/material";

import moneyFormat from "/utils/moneyFormat";
import { useDataProvider } from "/providers/DataProvider";
import { parseProjectDescription } from "/utils/parseProjectDescription";

export default function Details() {
  const { project, staffs } = useDataProvider();
  return (
    <>
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
            description={project.deadline ?? "Sin Fecha Fin"}
          />
        </Grid>
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container mt={3} xs={12} display="flex" justifyContent="center">
        <Grid
          item
          xs={12}
          md={project.selectedProcesses.length > 1 ? 10 : 12}
          ml={2}
        >
          <MDTypography variant="button" fontWeight="medium">
            Procesos seleccionados
          </MDTypography>
          {project.selectedProcesses.length > 1 ? (
            <Stepper activeStep={1} alternativeLabel>
              {project.selectedProcesses.map((process) => (
                <Step
                  key={process.id}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "12px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <StepLabel>{process.name}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <MDTypography
              variant="button"
              fontWeight="regular"
              verticalAlign="center"
              m={5}
            >
              No hay procesos seleccionados
            </MDTypography>
          )}
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
            description={project.plaintiff?.company ?? "Sin Demandante"}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Facturación"
            description={
              project.billingType?.label ?? "Sin Tipo de Facturación"
            }
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Horas Estimadas"
            description={project.estimatedHours ?? "Sin estimación"}
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
              project.staffs.length > 0
                ? project.staffs.at(-1)?.firstName +
                  " " +
                  project.staffs.at(-1)?.lastName
                : "Sin abogado principal"
            }
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        {parseProjectDescription(project.description) && (
          <>
            <Grid xs={12} mt={3}>
              <MDBox ml={2} mt={0.5} lineHeight={1.4}>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                >
                  Descripción
                </MDTypography>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  dangerouslySetInnerHTML={{
                    __html:
                      parseProjectDescription(project.description) ??
                      "Sin descripción",
                  }}
                />
              </MDBox>
            </Grid>
            <Divider variant="left" sx={{ width: "70%" }} />
          </>
        )}

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
              {member.profileImage && (
                <MDAvatar
                  src={`/images/staff/${member.profileImage}`}
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
                {member.firstName + " " + member.lastName}
              </MDTypography>
            </MDBox>
          ))}
          <UpdateMembers projectId={project.id} staffs={staffs} />
        </Grid>
      </Grid>
    </>
  );
}
