import React, { useEffect } from "react";
import moment from "moment";

import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

import { Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDDatePicker from "/components/MDDatePicker";

export default function OwnerForm({ formData, owner }) {
  const { values, errors, touched, setFieldValue, formField } = formData;
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
      setFieldValue(
        checkIn.name,
        owner.check_in ?? moment().format("YYYY-MM-DD")
      );
      setFieldValue(deed.name, owner.deed ?? "");
      setFieldValue(
        deedDate.name,
        owner.deed_date ?? moment().format("YYYY-MM-DD")
      );
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
      <Grid item mb={2}>
        <MDTypography variant="h6" fontWeight="bold" color="text">
          Datos del propietario
        </MDTypography>
      </Grid>
      <Grid xs={12} container spacing={3}>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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

        <Grid xs={12} sm={4} item>
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
        <Grid xs={12} sm={3} item>
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
      </Grid>
    </MDBox>
  );
}
