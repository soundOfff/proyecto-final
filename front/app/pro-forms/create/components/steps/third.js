"use client";

import { Autocomplete, Grid } from "@mui/material";
import { ErrorMessage } from "formik";
import { useState } from "react";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "/components/MDButton";
import Modal from "/components/Modal";
import ModalContentForm from "/components/ModalContent/Item/form";
import ItemTable from "/components/ItemTable";

export default function Third({ formData, taxes, groupIds, items: itemsData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { items } = formField;
  const [isOpen, setOpen] = useState(false);
  const [itemRows, setItemRows] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={5} p={5}>
      <Grid item xs={8}>
        <Autocomplete
          onChange={(e, selectedItem) => setItemRows([selectedItem])}
          options={itemsData}
          getOptionLabel={(option) => `${option.description}`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography
                variant="caption"
                display="inline"
                color="text"
                ml={2}
              >
                {`(${option.rate}) | ${option.description} ${
                  option.longDescription ?? ""
                }`}
              </MDTypography>
            </MDBox>
          )}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={items.label}
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
            <ErrorMessage name={items.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new article
        </MDButton>
      </Grid>
      <ItemTable rows={itemRows} />
      {isOpen && (
        <Modal open={open} onClose={handleClose} width="30%">
          <ModalContentForm taxes={taxes} groupIds={groupIds} />
        </Modal>
      )}
    </Grid>
  );
}
