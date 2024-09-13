"use client";

import { Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import Select from "/components/Select";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Partners from "./components/partners";
import { ErrorMessage, Field } from "formik";
import form from "./schemas/form";
import { useEffect, useState } from "react";
import moment from "moment";
import { PLAINTIFF, DEFENDANT } from "/utils/constants/PartnerProjectRoles";
import { getAll as getAllProcesses } from "/actions/processes";
import { getAll as getAllCourts } from "/actions/courts";
import { show as getProcess } from "/actions/processes";

export default function FormComponent({
  formData,
  project,
  proposals,
  roles,
  partnerData,
  billingTypes,
  serviceTypes,
  statuses,
  members,
}) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setFieldError,
  } = formData;
  const { formField } = form;
  const {
    billablePartner,
    cost,
    billingType,
    process,
    type,
    status,
    expedient,
    startDate,
    hasDeadline,
    deadline,
    serviceType,
    responsiblePersonId,
    selectedMembers,
    proposal,
    description,
    partners,
    notes,
    courtId,
  } = formField;

  const [processes, setProcesses] = useState([]);
  const [courts, setCourts] = useState([]);

  const partnerList = values[partners.name].map((partner) => {
    return {
      id: partner.id,
      name: partnerData.find((p) => p.id === partner.id).name,
      role: roles.find((role) => role.id === partner.role_id)?.label,
      owner: partnerData.find((p) => p.id === partner.owner_id)?.name,
    };
  });

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setFieldValue(hasDeadline.name, isChecked);
    if (!isChecked) {
      setFieldValue(deadline.name, "");
    }
  };

  const validatePartners = (partners) => {
    let error;

    const defendants = partners.filter(
      (partner) => partner.role_id === DEFENDANT
    );
    const plaintiffs = partners.filter(
      (partner) => partner.role_id === PLAINTIFF
    );

    if (defendants.length === 0 || plaintiffs.length === 0) {
      error = "Debe elegir al menos un demandado y un demandante";
      setFieldError("partners", error);
    }

    return error;
  };

  const types = [
    "Ejecutivo Hipotecario de Bien Inmueble",
    "Ejecutivo Hipotecario de Bien Mueble",
    "Ejecutivo Hipotecaria Mixto",
    "Ejecutivo Simple con Secuestro",
    "Ejecutivo Simple",
    "Sucesión Testada",
    "Sucesión Intestada",
    "Sumario",
    "Ordinario",
    "Declarativo",
    "Todos los anteriores puedes ser de mayor o menor cuantía",
    "Procesos Ejecución de Laudo",
    "Procesos de Ejecución en el Extranjero",
    "Proceso Oral",
    "Lanzamiento Por Intruso",
    "Lanzamiento Por Vencimiento de Contrato",
    "Lanzamiento por Mora con Retención de Bienes",
    "Proceso No Contencioso",
    "Denuncias",
    "Querellas",
    "ACODECO",
    "Procesos Laborales",
  ];

  useEffect(() => {
    if (project) {
      setFieldValue(cost.name, project.cost || "");
      setFieldValue(proposal.name, project.proposalId || "");
      setFieldValue(expedient.name, project.expedient || "");
      /*  setFieldValue(estimatedHours.name, project.estimatedHours || ""); */
      setFieldValue(billablePartner.name, project.billablePartnerId || "");
      setFieldValue(status.name, project.status.id);
      setFieldValue(courtId.name, project.court?.id);
      setFieldValue(serviceType.name, project.serviceType?.id || "");
      setFieldValue(billingType.name, project.billingType?.id || "");
      setFieldValue(type.name, project.type || "");
      setFieldValue(process.name, project.processId || "");
      setFieldValue(
        responsiblePersonId.name,
        project.responsiblePerson?.id || ""
      );
      setFieldValue(selectedMembers.name, project.members);
      setFieldValue(
        startDate.name,
        moment(project.startDate).format("YYYY-MM-DD")
      );
      setFieldValue(deadline.name, project.deadline ?? "");
      setFieldValue(
        partners.name,
        project.partners.map((partner) => {
          return {
            ...partner,
            role_id: partner.role?.id,
            owner_id: partner.owner?.id,
          };
        })
      );
      setFieldValue(hasDeadline.name, !!project.deadline);
      setFieldValue(
        notes.name,
        project.notes.map((note) => ({
          content: note.content,
          staff_id: note.staffId,
        })) ?? []
      );
    }
  }, [
    project,
    cost,
    expedient,
    type,
    process,
    billablePartner,
    status,
    serviceType,
    billingType,
    responsiblePersonId,
    selectedMembers,
    startDate,
    hasDeadline,
    deadline,
    partners,
    proposal,
    notes,
    setFieldValue,
    courtId,
  ]);

  useEffect(() => {
    if (values.project_service_type_id) {
      const params = {
        "filter[project_service_type_id]": values.project_service_type_id,
      };

      getAllProcesses(params).then((response) => {
        setProcesses(response.data.processes);
      });
    }
  }, [values.project_service_type_id]);

  useEffect(() => {
    if (values[process.name]) {
      getProcess(values[process.name], { include: ["toNotify"] }).then(
        (res) => {
          const prevValues = values[selectedMembers.name].filter(
            (val) =>
              res.toNotify.find((member) => member.id === val.id) === undefined
          );
          setFieldValue(selectedMembers.name, [...prevValues, ...res.toNotify]);
        }
      );
    }
  }, [values[process.name]]);

  useEffect(() => {
    const fetchCourts = async () => {
      const response = await getAllCourts();
      setCourts(response.data.courts);
    };
    fetchCourts();
  }, []);

  return (
    <MDBox p={5}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[billablePartner.name]}
            options={partnerData}
            optionLabel={(option) => option.name}
            fieldName={billablePartner.name}
            inputLabel={billablePartner.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            value={values[cost.name]}
            name={cost.name}
            label={cost.label}
            type={cost.type}
            placeholder={cost.placeholder}
            error={errors[cost.name] && touched[cost.name]}
            success={values[cost.name]?.length > 0 && !errors[cost.name]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[billingType.name]}
            options={billingTypes}
            optionLabel={(option) => option.label}
            fieldName={billingType.name}
            inputLabel={billingType.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            value={values[expedient.name]}
            name={expedient.name}
            label={expedient.label}
            type={expedient.type}
            placeholder={expedient.placeholder}
            error={errors[expedient.name] && touched[expedient.name]}
            success={
              values[expedient.name]?.length > 0 && !errors[expedient.name]
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={values[status.name]}
            options={statuses}
            optionLabel={(option) => option.label}
            fieldName={status.name}
            inputLabel={status.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={values[courtId.name]}
            options={courts}
            optionLabel={(option) => option.name}
            fieldName={courtId.name}
            inputLabel={courtId.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MDDatePicker
            value={values[startDate.name]}
            onChange={(date) =>
              setFieldValue(
                startDate.name,
                moment(date[0]).format("YYYY-MM-DD")
              )
            }
            input={{
              label: "Fecha De Inicio",
              fullWidth: true,
            }}
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
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values[hasDeadline.name]}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="¿El caso tiene fecha de entrega?"
          />
        </Grid>
        {values[hasDeadline.name] && (
          <Grid item xs={12} sm={6}>
            <MDDatePicker
              value={values[deadline.name]}
              onChange={(date) =>
                setFieldValue(
                  deadline.name,
                  moment(date[0]).format("YYYY-MM-DD")
                )
              }
              input={{
                label: "Fecha De Entrega",
                fullWidth: true,
              }}
            />
            <MDBox mt={0.75}>
              <MDTypography
                component="div"
                variant="caption"
                color="error"
                fontWeight="regular"
              >
                <ErrorMessage name={deadline.name} />
              </MDTypography>
            </MDBox>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Select
            value={values[serviceType.name]}
            options={serviceTypes}
            optionLabel={(option) => option.label}
            fieldName={serviceType.name}
            inputLabel={serviceType.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[process.name]}
            options={processes}
            optionLabel={(option) => option.name}
            fieldName={process.name}
            inputLabel={process.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            options={types}
            onChange={(event, newValue) => {
              setFieldValue(type.name, newValue);
            }}
            value={values[type.name]}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="standard"
                label={"Tipo de Caso"}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.type && touched.type)}
                helperText={touched.type && errors.type}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={values[responsiblePersonId.name]}
            options={members}
            optionLabel={(option) => option.name}
            fieldName={responsiblePersonId.name}
            inputLabel={responsiblePersonId.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            value={values[selectedMembers.name]}
            onChange={(e, members) =>
              setFieldValue(selectedMembers.name, members)
            }
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
          <MDBox mt={0.75}>
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              <ErrorMessage name={selectedMembers.name} />
            </MDTypography>
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            value={values[proposal.name]}
            options={proposals}
            optionLabel={(option) => option.name}
            fieldName={proposal.name}
            inputLabel={proposal.label}
            setFieldValue={setFieldValue}
          />
        </Grid>

        <Grid item xs={12}>
          <Partners
            {...{
              values,
              setFieldValue,
              project,
              partnerData,
              roles,
              partnerList,
              partners,
              description,
              notes,
            }}
          />
          <MDBox>
            <Field
              name={partners.name}
              validate={validatePartners}
              style={{ display: "none" }}
            />
            <MDTypography
              component="div"
              variant="caption"
              color="error"
              fontWeight="regular"
            >
              <ErrorMessage name={partners.name} />
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="end">
            <MDButton
              type="submit"
              variant="gradient"
              color="dark"
              disabled={isSubmitting}
              sx={{ mr: 5 }}
            >
              Guardar
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
