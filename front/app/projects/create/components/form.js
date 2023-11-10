"use client";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";

import { Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormField from "/pagesComponents/pages/account/components/FormField";
import { useEffect, useState } from "react";
import { EditorState } from "draft-js";

export default function Form({
  partners,
  statuses,
  serviceTypes,
  members,
  storeProject,
  billingTypes,
}) {
  const [partner, setPartner] = useState(null);
  const [status, setStatus] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [billingType, setBillingType] = useState(null);
  const [membersSelected, setMembers] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [description, setDescription] = useState(null);

  useEffect(() => {
    setDescription(editorState.getCurrentContent().getPlainText());
  }, [editorState, setDescription]);

  return (
    <MDBox component="form" action={storeProject} pb={3} px={3}>
      <MDBox mb={2} display="flex" justifyContent="space-between">
        <MDTypography variant="h5">Nuevo Proyecto</MDTypography>
        <MDButton color="dark" type="submit">
          Guardar
        </MDButton>
      </MDBox>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormField name="name" label="Nombre Del Caso" placeholder="Caso 1" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField name="cost" label="Costo Total" placeholder="$1.000" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name="estimated_hours"
            label="Horas Estimadas"
            placeholder="20"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField name="expedient" label="Expediente" placeholder="00001" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            onChange={(e, partner) => setPartner(partner)}
            options={partners}
            getOptionLabel={(option) => option.company}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label="Cliente"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <input name="defendant_id" type="hidden" value={partner?.id} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            onChange={(e, status) => setStatus(status)}
            options={statuses}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label="Estado"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <input name="project_status_id" type="hidden" value={status?.id} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            onChange={(e, type) => setServiceType(type)}
            options={serviceTypes}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label="Tipo De Servicio"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <input
            name="project_service_type_id"
            type="hidden"
            value={serviceType?.id}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(e, type) => setBillingType(type)}
            options={billingTypes}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label="Tipo De Facturación"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <input
            name="project_billing_type_id"
            type="hidden"
            value={billingType?.id}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            onChange={(e, members) => setMembers(members)}
            options={members}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label="Miembros Del Caso"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <input
            name="project_member_ids"
            type="hidden"
            value={membersSelected?.map((member) => member.id).join(",")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MDDatePicker
            input={{
              placeholder: "Fecha De Inicio",
              variant: "standard",
              fullWidth: true,
              name: "start_date",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MDDatePicker
            input={{
              placeholder: "Fecha De Entrega",
              variant: "standard",
              fullWidth: true,
              name: "deadline",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MDTypography variant="body2" color="text">
            Descripción Del Caso
          </MDTypography>
          <MDEditor
            editorStyle={{ minHeight: "20vh" }}
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <input name="description" type="hidden" value={description} />
        </Grid>
      </Grid>
    </MDBox>
  );
}
