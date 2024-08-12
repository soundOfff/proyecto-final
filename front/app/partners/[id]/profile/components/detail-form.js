"use client";

import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import { Form, Formik } from "formik";
import { update as updatePartner } from "/actions/partners";

import detailForm from "../schemas/detail-form";
import detailValidations from "../schemas/detail-validations";
import PersonForm from "./person-form";
import JuridicalForm from "./juridical-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DetailFormComponent({
  partner,
  consolidators,
  industries,
  sections,
  notJuridicEntities,
  partnerTypes,
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
        industry,
        relatedPartners,
        section,
        document,
        phone,
        buildingNumber,
        isResidential,
        fileNumber,
        rollNumber,
        imageNumber,
        dv,
      },

      person: {
        birthDate,
        expeditionDate,
        idType,
        idNumber,
        isConsolidator: isConsolidatorPerson,
        isMale,
        birthPlace,
        nationality,
      },
    },
  } = detailForm;

  const initialValues = {
    ...partner,
    [country.name]: partner.countryId ?? "",
    [province.name]: partner.jurisdiction?.district?.province?.id ?? "",
    [district.name]: partner.jurisdiction?.district?.id ?? "",
    [industry.name]: partner.industryId ?? "",
    [section.name]: partner.sectionId ?? "",
    [document.name]: partner.document ?? "",
    [jurisdiction.name]: partner.jurisdiction?.id ?? "",
    [isConsolidator.name]: partner.isConsolidator ?? "",
    [isConsolidatorPerson.name]: partner.isConsolidator ?? "",
    [consolidator.name]: partner.consolidatorId ?? "",
    [birthDate.name]: partner.birthDate ?? "",
    [expeditionDate.name]: partner.expeditionDate ?? "",
    [isMale.name]: partner.isMale ?? "",
    [idType.name]: partner.idType ?? "",
    [idNumber.name]: partner.idNumber ?? "",
    [birthPlace.name]: partner.birthPlaceId ?? "",
    [nationality.name]: partner.nationalityId ?? "",
    [phone.name]: partner.phoneNumber ?? "",
    [buildingNumber.name]: partner.buildingNumber ?? "",
    [relatedPartners.name]:
      partner.relatedPartners.map((partner) => partner.pivot) ?? [],
    [isResidential.name]: partner.isResidential ?? "",
    [fileNumber.name]: partner.fileNumber ?? "",
    [rollNumber.name]: partner.rollNumber ?? "",
    [imageNumber.name]: partner.imageNumber ?? "",
    [dv.name]: partner.dv?.toString() ?? "",
  };
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");
  const router = useRouter();

  const submitForm = async (values, actions) => {
    try {
      await updatePartner(partner.id, values);
      router.push("/partners");
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
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
            <MDSnackbar
              color="error"
              icon="warning"
              title="Error"
              content={errorMsg}
              open={errorSB}
              onClose={() => setErrorSB(false)}
              close={() => setErrorSB(false)}
              bgWhite
            />
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
                    industries,
                    sections,
                    consolidators,
                    partnerTypes,
                    notJuridicEntities,
                    errors,
                    values,
                    touched,
                    setFieldValue,
                  }}
                />
              )}
              <MDBox display="flex" justifyContent="end">
                <MDButton color="dark" type="submit">
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
