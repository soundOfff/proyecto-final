import UpdateMembers from "./update-members";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

import DefaultItem from "/examples/Items/DefaultItem";
import { Divider, Grid, Table, TableBody, TableRow } from "@mui/material";

import moneyFormat from "/utils/moneyFormat";
import { useDataProvider } from "/providers/DataProvider";
import { parseProjectDescription } from "/utils/parseProjectDescription";
import SelectedProcesses from "/components/Tasks/selected-processes";

const headers = [
  {
    box: {
      width: "auto",
      py: 1.5,
      px: 1,
      textAlign: "left",
    },
    header: "Nombre",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Rol",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Apoderado",
  },
];

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

export default function Details() {
  const { project, staffs } = useDataProvider();

  const filteredTasks = project.tasks.filter((task) => task.procedure !== null);

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
        <SelectedProcesses
          selectedProcesses={project.selectedProcesses}
          tasks={filteredTasks}
        />
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Cliente Facturable"
            description={project.billablePartner?.mergedName}
          />
        </Grid>

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Facturación"
            description={
              project.billingType?.label ?? "Sin Tipo de Facturación"
            }
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Horas Estimadas"
            description={project.estimatedHours ?? "Sin estimación"}
          />
        </Grid>

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Departamento"
            description={project.serviceType?.label}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

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

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Propuesta"
            description={project.proposal?.subject || "Sin propuesta asociada."}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        {parseProjectDescription(project.description) && (
          <>
            <Grid xs={12} sm={6} mt={3}>
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
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        {project.partners?.length > 0 && (
          <Grid xs={12} pl={2} mt={3}>
            <MDBox mt={0.5} lineHeight={1.4}>
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                mb={2}
              >
                Personas relacionadas
              </MDTypography>
            </MDBox>

            <MDBox width="100%" overflow="auto">
              <Table sx={{ minWidth: "32rem" }}>
                <MDBox component="thead">
                  <TableRow>
                    {headers.map(({ box, header }, index) => (
                      <MDBox
                        key={`${index}-headers`}
                        component="th"
                        width={box.width}
                        py={box.py}
                        pl={box.pl}
                        pr={box.pr}
                        textAlign={box.textAlign}
                        sx={borderBottom}
                      >
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="medium"
                        >
                          {header}
                        </MDTypography>
                      </MDBox>
                    ))}
                  </TableRow>
                </MDBox>
                <TableBody>
                  {project.partners?.map((partner) => (
                    <TableRow key={partner.id}>
                      <MDBox
                        component="td"
                        textAlign="left"
                        py={1}
                        pr={1}
                        sx={borderBottom}
                      >
                        <MDTypography
                          variant="body2"
                          color="text"
                          fontWeight="regular"
                        >
                          {partner.mergedName}
                        </MDTypography>
                      </MDBox>
                      <MDBox
                        component="td"
                        textAlign="left"
                        py={1}
                        pr={1}
                        pl={3}
                        sx={borderBottom}
                      >
                        <MDTypography
                          variant="body2"
                          color="text"
                          fontWeight="regular"
                        >
                          {partner.role?.label}
                        </MDTypography>
                      </MDBox>
                      <MDBox
                        component="td"
                        textAlign="left"
                        py={1}
                        pr={1}
                        pl={3}
                        sx={borderBottom}
                      >
                        <MDTypography
                          variant="body2"
                          color="text"
                          fontWeight="regular"
                        >
                          {partner.owner?.company || partner.owner?.name}
                        </MDTypography>
                      </MDBox>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </>
  );
}
