import React from "react";
import { Grid, Icon, Switch, FormControlLabel, FormGroup } from "@mui/material";
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
2;
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
  partnerTypes,
}) {
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
    <Grid
      container
      spacing={3}
      gap={5}
      sx={{
        padding: "20px 80px 80px 80px !important",
      }}
    >
      <Grid item xs={12}>
        <MDTypography variant="h5">Personas Relacionadas</MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
        gap={2}
        sx={{
          width: "100%",
          flexWrap: "nowrap",
          "@media (max-width: 576px)": {
            width: "100%",
            flexWrap: "wrap",
          },
        }}
      >
        <Select
          value={values[relatedPartnerId.name]}
          options={notJuridicalEntities}
          optionLabel={(option) => option.mergedName}
          fieldName={relatedPartnerId.name}
          inputLabel={"Persona Relacionada"}
          sx={{ width: "300px" }}
          setFieldValue={setFieldValue}
        />
        <Select
          value={values[partnerTypeId.name]}
          options={partnerTypes}
          optionLabel={(option) => option.label}
          fieldName={partnerTypeId.name}
          inputLabel={"Cargo de la Persona"}
          sx={{ width: "300px" }}
          setFieldValue={setFieldValue}
        />
        <MDDatePicker
          input={{
            fullWidth: false,
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
        <MDDatePicker
          input={{
            fullWidth: false,
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
        <MDButton
          variant="gradient"
          color="dark"
          display="flex"
          sx={{
            width: "fit-content",
            height: "fit-content",
            "@media (max-width: 780px)": {
              width: "100%",
            },
          }}
          gap={1}
          p={1}
          alignContent="center"
          onClick={handleSubmit}
        >
          Agregar Persona
        </MDButton>
      </Grid>
      <Grid item xs={12}>
        <MDBox
          py={2}
          px={2}
          borderRadius="lg"
          sx={{ border: 1, borderColor: "grey.400" }}
        >
          <DataTable table={table} showTotalEntries={false} isSorted={false} />
        </MDBox>
      </Grid>
    </Grid>
  );
}
