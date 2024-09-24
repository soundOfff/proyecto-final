import React, { useEffect } from "react";
import moment from "moment";

import FormField from "../components/form-field";
import { Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import MDButton from "/components/MDButton";

export default function OwnerForm({
  formField,
  values,
  owner,
  setFieldValue,
  handleCancel,
  handleSubmit,
  errors,
  touched,
}) {
  console.log(owner);
  const {
    seat,
    checkIn,
    deed,
    deedDate,
    legalCircuit,
    notary,
    sheet,
    relatedPartnerId,
    partnerTypeId,
  } = formField;

  useEffect(() => {
    if (owner) {
      setFieldValue(partnerTypeId.name, owner.partner_type_id ?? "");
      setFieldValue(relatedPartnerId.name, owner.related_partner_id ?? "");
      setFieldValue(seat.name, owner.seat ?? "");
      setFieldValue(checkIn.name, owner.check_in ?? "");
      setFieldValue(deed.name, owner.deed ?? "");
      setFieldValue(deedDate.name, owner.deed_date ?? "");
      setFieldValue(legalCircuit.name, owner.legal_circuit ?? "");
      setFieldValue(notary.name, owner.notary ?? "");
      setFieldValue(sheet.name, owner.sheet ?? "");
    }
  }, [owner, setFieldValue]);

  return (
    <MDBox
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <MDBox
        color="white"
        bgColor="dark"
        variant="gradient"
        borderRadius="lg"
        shadow="lg"
        overflow="auto"
        opacity={1}
        p={2}
        mb={2}
      >
        Datos del propietario
      </MDBox>
      <Grid xs={12} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <FormField
            name={seat.name}
            label={seat.label}
            type={seat.type}
            setFieldValue={setFieldValue}
            value={values[seat.name]}
            error={errors[seat.name] && touched[seat.name]}
            success={values[seat.name]?.length > 0 && !errors[seat.name]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={legalCircuit.name}
            label={legalCircuit.label}
            setFieldValue={setFieldValue}
            type={legalCircuit.type}
            value={values[legalCircuit.name]}
            error={errors[legalCircuit.name] && touched[legalCircuit.name]}
            success={
              values[legalCircuit.name]?.length > 0 &&
              !errors[legalCircuit.name]
            }
          />
        </Grid>

        <Grid xs={12} sm={6} item>
          <MDDatePicker
            input={{
              fullWidth: true,
              label: "Entrada",
            }}
            format="DD/MM/YYYY"
            value={values[checkIn.name]}
            onChange={(value) =>
              setFieldValue(checkIn.name, moment(value[0]).format("YYYY-MM-DD"))
            }
          />
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              {errors[checkIn.name]}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            name={deed.name}
            label={deed.label}
            setFieldValue={setFieldValue}
            type={deed.type}
            value={values[deed.name]}
            error={errors[deed.name] && touched[deed.name]}
            success={values[deed.name]?.length > 0 && !errors[deed.name]}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <MDDatePicker
            input={{
              fullWidth: true,
              label: "Fecha de escritura",
            }}
            format="DD/MM/YYYY"
            value={values[deedDate.name]}
            onChange={(value) =>
              setFieldValue(
                deedDate.name,
                moment(value[0]).format("YYYY-MM-DD")
              )
            }
          />
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              {errors[deedDate.name]}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={notary.name}
            label={notary.label}
            setFieldValue={setFieldValue}
            type={notary.type}
            multiline
            rows={2}
            value={values[notary.name]}
            error={errors[notary.name] && touched[notary.name]}
            success={values[notary.name]?.length > 0 && !errors[notary.name]}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={sheet.name}
            label={sheet.label}
            setFieldValue={setFieldValue}
            multiline
            rows={2}
            type={sheet.type}
            value={values[sheet.name]}
            error={errors[sheet.name] && touched[sheet.name]}
            success={values[sheet.name]?.length > 0 && !errors[sheet.name]}
          />
        </Grid>
      </Grid>
      <MDBox width="100%" mt={3} display="flex" justifyContent="space-between">
        <MDButton variant="gradient" color="light" onClick={handleCancel}>
          Cancelar
        </MDButton>
        <MDButton variant="gradient" color="dark" onClick={handleSubmit}>
          {owner ? "Editar Persona" : "Agregar Persona"}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
