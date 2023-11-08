import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";

// Settings page components
import FormField from "/pagesComponents/pages/account/components/FormField";
import Autocomplete from "./components/select";

import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { select as selectMembers } from "/actions/staffs";
import { store as storeProject } from "/actions/projects";

export default async function NewProject() {
  const selectPartners = await getPartnerSelect();
  const statuses = await getAllStatuses();
  const serviceTypes = await getAllServiceTypes();
  const members = await selectMembers();

  return (
    <Card id="new-project" sx={{ overflow: "visible", mb: 5 }}>
      <MDBox p={3}>
        <MDBox component="form" action={storeProject} pb={3} px={3}>
          <MDBox mb={2} display="flex" justifyContent="space-between">
            <MDTypography variant="h5">Nuevo Proyecto</MDTypography>
            <MDButton color="dark" type="submit">
              Guardar
            </MDButton>
          </MDBox>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Nombre Del Caso"
                name="name"
                placeholder="Caso 1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label="Costo Total" placeholder="$1.000" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label="Horas Estimadas" placeholder="20" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label="Expediente" placeholder="00001" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                data={selectPartners.map((partner) => partner.company)}
                label="Cliente"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                data={statuses.map((status) => status.label)}
                label="Estado"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                data={serviceTypes.map((type) => type.label)}
                label="Tipo De Servicio"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                data={members.map((staff) => staff.name)}
                label="Miembros Del Caso"
                multiple
              />
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="body2" color="text">
                Descripción Del Caso
              </MDTypography>
              <MDEditor editorStyle={{ minHeight: "20vh" }} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}
