import React, { useState } from "react";
import { Grid, Icon, Switch, FormControlLabel, FormGroup } from "@mui/material";
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import Modal from "/components/Modal";
import PersonForm from "/components/ModalContent/Partner/";
import FormField from "./form-field";

import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";

const newRelatedPeopleFormField = {
  formId: "new-related-people",
  formField: {
    relatedPartnerId: {
      name: "related_partner_id",
      label: "Persona Relacionada",
      errorMsg: "La persona relacionada es requerida",
    },
    partnerTypeId: {
      name: "partner_type_id",
      label: "Cargo de la Persona",
      errorMsg: "El cargo de la persona es requerido",
    },
    startDate: {
      name: "start_date",
      label: "Fecha de Inicio",
      errorMsg: "La fecha de inicio es requerida",
    },
    endDate: {
      name: "end_date",
      label: "Fecha de Fin",
    },
    active: {
      name: "active",
      label: "Activo",
      errorMsg: "El estado de la persona relacionada es requerido",
    },
    seat: {
      name: "seat",
      label: "Asiento",
      errorMsg: "El asiento es requerido",
    },
    legalCircuit: {
      name: "legal_circuit",
      label: "Circuito Legal",
      errorMsg: "El circuito legal es requerido",
    },
    checkIn: {
      name: "check_in",
      label: "Fecha de Entrada",
      errorMsg: "La fecha de entrada es requerida",
    },
    deed: {
      name: "deed",
      label: "Escritura",
      errorMsg: "La escritura es requerida",
    },
    deedDate: {
      name: "deed_date",
      label: "Fecha de Escritura",
      errorMsg: "La fecha de la escritura es requerida",
    },
    notary: {
      name: "notary",
      label: "Notaría",
      errorMsg: "La notaría es requerida",
    },
    sheet: {
      name: "sheet",
      label: "Ficha",
      errorMsg: "La ficha es requerida",
    },
  },
};

export default function RelatedPersonFormComponent({
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  notJuridicalEntities,
  countries,
  partnerTypes,
}) {
  const [openModal, setOpenModal] = useState(false);
  const {
    relatedPartnerId,
    partnerTypeId,
    startDate,
    endDate,
    active,
    seat,
    checkIn,
    deed,
    deedDate,
    legalCircuit,
    notary,
    sheet,
  } = newRelatedPeopleFormField.formField;

  const addRelatedPersonValidationSchema = Yup.object().shape({
    [relatedPartnerId.name]: Yup.string().required(relatedPartnerId.errorMsg),
    [partnerTypeId.name]: Yup.string().required(partnerTypeId.errorMsg),
    [startDate.name]: Yup.string().required(startDate.errorMsg),
    [endDate.name]: Yup.string().nullable(),
    [active.name]: Yup.boolean().required(active.errorMsg),
    [seat.name]: Yup.string(),
    [checkIn.name]: Yup.date(),
    [deed.name]: Yup.string(),
    [deedDate.name]: Yup.date(),
    [legalCircuit.name]: Yup.string(),
    [notary.name]: Yup.string(),
    [sheet.name]: Yup.string(),
  });

  const clearFields = (actions) => {
    setFieldValue(startDate.name, moment().format("YYYY-MM-DD"));
    setFieldValue(endDate.name, "");
    setFieldValue(partnerTypeId.name, "");
    setFieldValue(relatedPartnerId.name, "");
    setFieldValue(active.name, true);
    setFieldValue(seat.name, "");
    setFieldValue(checkIn.name, moment().format("YYYY-MM-DD"));
    setFieldValue(deed.name, "");
    setFieldValue(deedDate.name, moment().format("YYYY-MM-DD"));
    setFieldValue(legalCircuit.name, "");
    setFieldValue(notary.name, "");
    setFieldValue(sheet.name, "");
    actions.setTouched({});
  };

  const deleteRelatedPartner = (index) => {
    const filteredPartners = externalValues.related_partners.filter(
      (_, i) => i !== index
    );
    setFieldValueExternal("related_partners", filteredPartners);
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [relatedPartnerId.name]: "",
      [partnerTypeId.name]: "",
      [startDate.name]: moment().format("YYYY-MM-DD"),
      [endDate.name]: "",
      [active.name]: true,
      [seat.name]: "",
      [deed.name]: "",
      [checkIn.name]: moment().format("YYYY-MM-DD"),
      [deedDate.name]: moment().format("YYYY-MM-DD"),
      [legalCircuit.name]: "",
      [notary.name]: "",
      [sheet.name]: "",
    },
    validationSchema: addRelatedPersonValidationSchema,
    onSubmit: (values, methods) => {
      console.log(values);
      setFieldValueExternal("related_partners", [
        ...externalValues.related_partners,
        {
          related_partner_id: values[relatedPartnerId.name],
          partner_type_id: values[partnerTypeId.name],
          start_date: values[startDate.name],
          end_date: values[endDate.name],
          active: values[active.name],
          seat: values[seat.name],
          deed: values[deed.name],
          check_in: values[checkIn.name],
          deed_date: values[deedDate.name],
          legal_circuit: values[legalCircuit.name],
          notary: values[notary.name],
          sheet: values[sheet.name],
        },
      ]);
      clearFields(methods);
    },
  });
  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <MDTypography variant="caption">
          {
            notJuridicalEntities.find(
              (partner) => partner.id === row.original.related_partner_id
            )?.mergedName
          }
        </MDTypography>
      ),
    },
    {
      Header: "Cargo de la Persona",
      accessor: "partner_type_id",
      Cell: ({ row }) => (
        <MDTypography variant="caption">
          {
            partnerTypes.find(
              (partnerType) => partnerType.id === row.original.partner_type_id
            )?.label
          }
        </MDTypography>
      ),
    },
    {
      Header: "Asiento",
      accessor: "seat",
    },
    {
      Header: "Circuito Legal",
      accessor: "legal_circuit",
    },
    {
      Header: "Fecha de Entrada",
      accessor: "check_in",
    },
    {
      Header: "Escritura",
      accessor: "deed",
    },
    {
      Header: "Fecha de Escritura",
      accessor: "deed_date",
    },
    {
      Header: "Notaría",
      accessor: "notary",
    },
    {
      Header: "Ficha",
      accessor: "sheet",
    },
    {
      Header: "Fecha inicio",
      accessor: "start_date",
    },
    {
      Header: "Fecha fin",
      accessor: "end_date",
    },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => {
        const label = { inputProps: { "aria-label": "Is active switch" } };
        return <Switch {...label} checked={Boolean(value)} />;
      },
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => deleteRelatedPartner(row.index)}
            >
              <Icon>delete</Icon>&nbsp;Borrar
            </MDButton>
          </MDBox>
        );
      },
    },
  ];

  const table = {
    columns,
    rows: externalValues.related_partners,
  };

  return (
    <>
      <Grid xs={12} item>
        <MDTypography variant="h5">Personas Relacionadas</MDTypography>
      </Grid>
      <Grid xs={12} sm={3} item>
        <Select
          value={values[relatedPartnerId.name]}
          options={notJuridicalEntities}
          optionLabel={(option) => option.mergedName}
          fieldName={relatedPartnerId.name}
          inputLabel={"Persona Relacionada"}
          setFieldValue={setFieldValue}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[relatedPartnerId.name]}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid xs={12} sm={3} item>
        <Select
          value={values[partnerTypeId.name]}
          options={partnerTypes}
          optionLabel={(option) => option.label}
          fieldName={partnerTypeId.name}
          inputLabel={"Cargo de la Persona"}
          setFieldValue={setFieldValue}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[partnerTypeId.name]}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid xs={12} sm={2} item>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha inicio",
          }}
          format="DD/MM/YYYY"
          value={values[startDate.name]}
          onChange={(value) =>
            setFieldValue(startDate.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[startDate.name]}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid xs={12} sm={2} item>
        <MDDatePicker
          input={{
            fullWidth: true,
            label: "Fecha fin",
          }}
          format="DD/MM/YYYY"
          value={values[endDate.name]}
          onChange={(value) =>
            setFieldValue(endDate.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[endDate.name]}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid xs={12} sm={2} item>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values[active.name]}
                onChange={(e) => setFieldValue(active.name, e.target.checked)}
              />
            }
            label={active.label}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={2}>
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
      <Grid item xs={12} sm={2}>
        <FormField
          name={legalCircuit.name}
          label={legalCircuit.label}
          setFieldValue={setFieldValue}
          type={legalCircuit.type}
          value={values[legalCircuit.name]}
          error={errors[legalCircuit.name] && touched[legalCircuit.name]}
          success={
            values[legalCircuit.name]?.length > 0 && !errors[legalCircuit.name]
          }
        />
      </Grid>
      <Grid xs={12} sm={2} item>
        <MDDatePicker
          input={{
            fullWidth: false,
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
      <Grid item xs={12} sm={2}>
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
      <Grid xs={12} sm={2} item>
        <MDDatePicker
          input={{
            fullWidth: false,
            label: "Fecha de escritura",
          }}
          format="DD/MM/YYYY"
          value={values[deedDate.name]}
          onChange={(value) =>
            setFieldValue(deedDate.name, moment(value[0]).format("YYYY-MM-DD"))
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
      <Grid item xs={12} sm={1}>
        <FormField
          name={notary.name}
          label={notary.label}
          setFieldValue={setFieldValue}
          type={notary.type}
          value={values[notary.name]}
          error={errors[notary.name] && touched[notary.name]}
          success={values[notary.name]?.length > 0 && !errors[notary.name]}
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <FormField
          name={sheet.name}
          label={sheet.label}
          setFieldValue={setFieldValue}
          type={sheet.type}
          value={values[sheet.name]}
          error={errors[sheet.name] && touched[sheet.name]}
          success={values[sheet.name]?.length > 0 && !errors[sheet.name]}
        />
      </Grid>
      <Grid xs={12} display="flex" gap={2} justifyContent="end" item>
        <MDButton
          variant="gradient"
          color="success"
          onClick={() => setOpenModal(true)}
        >
          Crear Persona
        </MDButton>
        <MDButton variant="gradient" color="dark" onClick={handleSubmit}>
          Agregar Persona
        </MDButton>
      </Grid>
      <Grid item xs={12} mb={5}>
        <MDBox
          py={2}
          borderRadius="lg"
          sx={{ border: 1, borderColor: "grey.400" }}
        >
          <DataTable table={table} showTotalEntries={false} isSorted={false} />
        </MDBox>
      </Grid>
      <Modal open={openModal} onClose={() => setOpenModal(false)} width="50%">
        <PersonForm
          countries={countries}
          handleClose={() => setOpenModal(false)}
          setFieldValue={setFieldValue}
        />
      </Modal>
    </>
  );
}
