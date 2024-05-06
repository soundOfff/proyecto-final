"use client";

import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { Form, Formik } from "formik";
import { update as updatePartner } from "/actions/partners";

import detailForm from "../schemas/detail-form";
import detailValidations from "../schemas/detail-validations";
import PersonForm from "./person-form";
import JuridicalForm from "./juridical-form";

export default function DetailFormComponent({
  partner,
  consolidators,
  notJuridicEntities,
  countries,
}) {
  const {
    formId,
    formField: {
      juridical: {
        consolidator,
        isConsolidator,
        country,
        province,
        district,
        jurisdiction,
        phone,
        buildingNumber,
        isResidential,
        president,
        secretary,
        treasurer,
        fileNumber,
        rollNumber,
        imageNumber,
      },

      person: {
        birthDate,
        expeditionDate,
        isConsolidator: isConsolidatorPerson,
        isMale,
        birthPlace,
        nationality,
      },
    },
  } = detailForm;
  const initialValues = {
    ...partner,
    [country.name]: partner.countryId,
    [province.name]: partner.jurisdiction?.district?.province?.id,
    [district.name]: partner.jurisdiction?.district?.id,
    [jurisdiction.name]: partner.jurisdiction?.id,
    [isConsolidator.name]: partner.isConsolidator,
    [isConsolidatorPerson.name]: partner.isConsolidator,
    [consolidator.name]: partner.consolidatorId,
    [birthDate.name]: partner.birthDate,
    [expeditionDate.name]: partner.expeditionDate,
    [isMale.name]: partner.isMale,
    [birthPlace.name]: partner.birthPlaceId,
    [nationality.name]: partner.nationalityId,
    [phone.name]: partner.phoneNumber,
    [buildingNumber.name]: partner.buildingNumber,
    [isResidential.name]: partner.isResidential,
    [president.name]: partner.presidentId,
    [secretary.name]: partner.secretaryId,
    [treasurer.name]: partner.treasurerId,
    [fileNumber.name]: partner.fileNumber,
    [rollNumber.name]: partner.rollNumber,
    [imageNumber.name]: partner.imageNumber,
  };

  const submitForm = async (values, actions) => {
    await updatePartner(partner.id, values);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={
          partner.name ? detailValidations.person : detailValidations.juridical
        }
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
            <MDBox p={3}>
              <MDTypography variant="h5">Editar Cliente</MDTypography>
            </MDBox>
            <MDBox pb={3} px={3}>
              {partner.name && (
                <PersonForm
                  {...{
                    countries,
                    consolidators,
                    errors,
                    values,
                    touched,
                    setFieldValue,
                  }}
                />
              )}
              {partner.company && (
                <JuridicalForm
                  {...{
                    countries,
                    consolidators,
                    notJuridicEntities,
                    errors,
                    values,
                    touched,
                    setFieldValue,
                  }}
                />
              )}
              <MDBox display="flex" justifyContent="end">
                <MDButton color="dark" type="submit" disabled={isSubmitting}>
                  Guardar
                </MDButton>
              </MDBox>
            </MDBox>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
