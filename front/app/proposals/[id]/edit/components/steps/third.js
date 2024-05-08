"use client";

import { Autocomplete, Grid } from "@mui/material";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "/components/MDButton";
import Modal from "/components/Modal";
import ModalContentForm from "/components/ModalContent/Item/form";
import ItemTable from "/components/ItemTable";
import ItemForm from "/components/ItemForm";
import ItemTotals from "/components/ItemTotals";

export default function Third({
  formData,
  proposal,
  itemTypes,
  taxes,
  groupIds,
  items: itemsData,
}) {
  const { formField, setFieldValue } = formData;
  const { items, adjustment } = formField;
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFieldValue(adjustment.name, proposal.adjustment);
  }, [proposal, adjustment, setFieldValue]);

  return (
    <Grid container spacing={2} p={5}>
      <Grid item xs={6}>
        <Autocomplete
          onChange={(e, selectedItem) => {
            if (selectedItem) setItem(selectedItem);
          }}
          groupBy={(option) =>
            option.itemGroup ? option.itemGroup.name : null
          }
          options={itemsData.sort((a, b) => {
            if (a.itemGroup && b.itemGroup) {
              return a.itemGroup.name[0] < b.itemGroup.name[0] ? -1 : 1;
            } else if (a.itemGroup) {
              return 1;
            } else if (b.itemGroup) {
              return -1;
            } else {
              return 0;
            }
          })}
          getOptionLabel={(option) => `($${option.rate}) ${option.description}`}
          isOptionEqualToValue={(option, value) => option === value}
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
      <Grid xs={2} item>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          Crear Item
        </MDButton>
        {isOpen && (
          <Modal open={open} onClose={handleClose} width="30%" height="auto">
            <ModalContentForm taxes={taxes} groupIds={groupIds} />
          </Modal>
        )}
      </Grid>
      <ItemForm
        formData={formData}
        item={item}
        taxesData={taxes}
        types={itemTypes}
      />
      <Grid item xs={12}>
        <ItemTable formData={formData} types={itemTypes} />
      </Grid>
      <ItemTotals formData={formData} />
    </Grid>
  );
}
