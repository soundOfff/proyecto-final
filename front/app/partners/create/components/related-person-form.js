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

import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { ErrorMessage } from "formik";

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
  const { relatedPartnerId, partnerTypeId, startDate, endDate, active } =
    newRelatedPeopleFormField.formField;

  const addRelatedPersonValidationSchema = Yup.object().shape({
    [relatedPartnerId.name]: Yup.string().required(relatedPartnerId.errorMsg),
    [partnerTypeId.name]: Yup.string().required(partnerTypeId.errorMsg),
    [startDate.name]: Yup.string().required(startDate.errorMsg),
    [endDate.name]: Yup.string().nullable(),
    [active.name]: Yup.boolean().required(active.errorMsg),
  });

  const clearFields = (actions) => {
    setFieldValue(startDate.name, "");
    setFieldValue(endDate.name, "");
    setFieldValue(partnerTypeId.name, "");
    setFieldValue(relatedPartnerId.name, "");
    setFieldValue(active.name, false);
    actions.setTouched({});
  };

  const deleteRelatedPartner = (index) => {
    const filteredPartners = externalValues.related_partners.filter(
      (_, i) => i !== index
    );
    setFieldValueExternal("related_partners", filteredPartners);
  };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [relatedPartnerId.name]: "",
      [partnerTypeId.name]: "",
      [startDate.name]: "",
      [endDate.name]: "",
      [active.name]: false,
    },
    validationSchema: addRelatedPersonValidationSchema,
    onSubmit: (values, methods) => {
      setFieldValueExternal("related_partners", [
        ...externalValues.related_partners,
        {
          related_partner_id: values[relatedPartnerId.name],
          partner_type_id: values[partnerTypeId.name],
          start_date: values[startDate.name],
          end_date: values[endDate.name],
          active: values[active.name],
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
            <ErrorMessage name={startDate.name} />
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
            <ErrorMessage name={endDate.name} />
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
        />
      </Modal>
    </>
  );
}
