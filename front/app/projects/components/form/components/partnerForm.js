"use client";

import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import Select from "/components/Select";
import MDButton from "/components/MDButton";
import * as Yup from "yup";
import MDTypography from "/components/MDTypography";
import { PLAINTIFF } from "/utils/constants/PartnerProjectRoles";
import { show as getOwners } from "/actions/partners";
import OwnerForm from "../../owner/";
import { useFormik } from "formik";
import moment from "moment";

export default function PartnerForm({
  setFieldValue: setFieldValueExternal,
  values: externalValues,
  partnerData,
  roles: roleData,
}) {
  const formField = useMemo(() => {
    return {
      partner: {
        name: "id",
        label: "Clientes",
        errorMsg: "El cliente es requerido",
      },
      role: {
        name: "role_id",
        label: "Rol",
        errorMsg: "El rol es requerido",
      },
      owner: {
        name: "owner_id",
        label: "Apoderado",
      },
    };
  }, []);
  const validations = Yup.object().shape({
    [formField.partner.name]: Yup.number().required(formField.partner.errorMsg),
    [formField.role.name]: Yup.string().required(formField.role.errorMsg),
  });
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [formField.partner.name]: "",
      [formField.role.name]: "",
      [formField.owner.name]: "",
    },
    validationSchema: validations,
    onSubmit: (values, methods) => {
      setFieldValueExternal("partners", [
        ...externalValues.partners,
        {
          [formField.partner.name]: values[formField.partner.name],
          [formField.role.name]: values[formField.role.name],
          [formField.owner.name]: values[formField.owner.name],
        },
      ]);
      clearFields(methods);
    },
  });

  const [owners, setOwners] = useState([]);
  const [owner, setOwner] = useState(null);

  const handleChangeOwner = (ownerName) => {
    const owner = owners.find((owner) => owner.mergedName === ownerName)?.pivot;
    setOwner(owner);
  };

  const handlePartnerChange = () => {
    setOwners([]);
    setOwner({
      partner_type_id: "",
      related_partner_id: "",
      seat: "",
      check_in: moment().format("YYYY-MM-DD"),
      deed: "",
      deed_date: moment().format("YYYY-MM-DD"),
      legal_circuit: "",
      notary: "",
      sheet: "",
    });
  };

  const clearFields = (methods) => {
    setFieldValue(formField.partner.name, "");
    setFieldValue(formField.role.name, "");
    setFieldValue(formField.owner.name, "");
    methods.resetForm();
    setOwner(null);
  };
  const isOwnerRequired = Boolean(
    values[formField.partner.name] && values[formField.role.name] == PLAINTIFF
  );

  useEffect(() => {
    if (isOwnerRequired) {
      getOwners(values[formField.partner.name], {
        include: ["relatedPartners"],
      }).then((partner) => {
        setOwners(partner.relatedPartners);
      });
    }
  }, [isOwnerRequired, values, formField]);

  return (
    <Grid container spacing={5} mb={5} mt={2}>
      <Grid item xs={12}>
        <MDTypography variant="h5" fontWeight="bold">
          Personas Relacionadas
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[formField.partner.name]}
          options={partnerData}
          optionLabel={(option) => option.name}
          fieldName={formField.partner.name}
          inputLabel={formField.partner.label}
          setFieldValue={setFieldValue}
          onInputChange={handlePartnerChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[formField.role.name]}
          options={roleData}
          optionLabel={(option) => option.label}
          fieldName={formField.role.name}
          inputLabel={formField.role.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      {isOwnerRequired && (
        <>
          <Grid item xs={12} sm={4}>
            <Select
              value={values[formField.owner.name]}
              options={owners}
              optionLabel={(option) => option.mergedName}
              fieldName={formField.owner.name}
              inputLabel={formField.owner.label}
              setFieldValue={setFieldValue}
              onInputChange={handleChangeOwner}
            />
          </Grid>
          <Grid item xs={12}>
            <OwnerForm owner={owner} handleSubmit={handleSubmit} />
          </Grid>
        </>
      )}
      {!isOwnerRequired && (
        <Grid item>
          <MDButton
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Agregar
          </MDButton>
        </Grid>
      )}
    </Grid>
  );
}
