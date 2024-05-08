"use client";
import { Grid, Autocomplete } from "@mui/material";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDDatePicker from "/components/MDDatePicker";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import Select from "/components/Select";
import form from "./schemas/form";

import { Form, Formik, ErrorMessage } from "formik";

import { store as storeItem } from "/actions/payments";
import moment from "moment";

export default function ModalContentForm({
  onClose,
  partners,
  paymentMethods,
}) {
  const { formField, formId } = form;
  const {
    amount,
    expensesAmount,
    paymentMethodId,
    partnerId,
    date,
    note,
    transactionId,
  } = formField;

  const handleSubmit = async (values) => {
    await storeItem(values);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form id={formId} autoComplete="off">
          <MDBox
            color="white"
            bgColor="dark"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            Nuevo Pago
          </MDBox>
          <MDBox sx={{ p: 5 }}>
            <Grid container lineHeight={0} spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  name={amount.name}
                  label={amount.label}
                  type={amount.type}
                  placeholder={amount.placeholder}
                  value={values[amount.name]}
                  error={errors.amount && touched.amount}
                  success={amount.length > 0 && !errors.amount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name={expensesAmount.name}
                  label={expensesAmount.label}
                  type={expensesAmount.type}
                  placeholder={expensesAmount.placeholder}
                  value={values[expensesAmount.name]}
                  error={errors.expensesAmount && touched.expensesAmount}
                  success={expensesAmount.length > 0 && !errors.expensesAmount}
                />
              </Grid>
              <Grid item xs={12} sm={6} mt={2}>
                <MDDatePicker
                  input={{
                    label: "Fecha de cobro",
                    fullWidth: true,
                  }}
                  value={values[date.name]}
                  onChange={(value) =>
                    setFieldValue(
                      date.name,
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
                    <ErrorMessage name={date.name} />
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name={transactionId.name}
                  label={transactionId.label}
                  type={transactionId.type}
                  placeholder={transactionId.placeholder}
                  value={values[transactionId.name]}
                  error={errors.transactionId && touched.transactionId}
                  success={transactionId.length > 0 && !errors.transactionId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[partnerId.name]}
                  options={partners}
                  optionLabel={(option) => option.name}
                  fieldName={partnerId.name}
                  inputLabel={partnerId.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  value={values[paymentMethodId.name]}
                  options={paymentMethods}
                  optionLabel={(option) => option.name.toUpperCase()}
                  fieldName={paymentMethodId.name}
                  inputLabel={paymentMethodId.label}
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name={note.name}
                  multiline
                  rows={3}
                  label={note.label}
                  type={note.type}
                  placeholder={note.placeholder}
                  value={values[note.name]}
                  error={errors.note && touched.note}
                  success={note.length > 0 && !errors.note}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox p={3}>
            <MDBox
              mt={2}
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <MDButton variant="gradient" color="light" onClick={handleCancel}>
                Cancelar
              </MDButton>
              <MDButton
                disabled={isSubmitting}
                type="submit"
                variant="gradient"
                color="dark"
              >
                Guardar
              </MDButton>
            </MDBox>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
}
