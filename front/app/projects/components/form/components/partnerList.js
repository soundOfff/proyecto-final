"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";

export default function PartnerList({
  rows = [],
  setFieldValue,
  partnerField,
  values,
}) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [index, setIndex] = useState(null);

  const deleteRow = () => {
    const filteredPartners = values[partnerField.name].filter(
      (_, i) => i !== index
    );

    setFieldValue(partnerField.name, filteredPartners);
  };

  const handleOwnerChange = (event, row) => {
    const newOwnerId = event.target.value;

    const updatedPartners = values.partners.map((partner) =>
      partner.id === row.original.id
        ? { ...partner, owner_id: newOwnerId }
        : partner
    );

    setFieldValue("partners", updatedPartners);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) => (
        <Link href={`/partners/${row.original.id}/profile`}>
          <MDBox mr={1}>
            <MDTypography variant="caption" color="info">
              {row.original.name}
            </MDTypography>
          </MDBox>
        </Link>
      ),
    },
    {
      Header: "Rol",
      accessor: "role",
    },
    {
      Header: "Apoderado",
      accessor: "owner",
      Cell: ({ row }) =>
        row.original.relatedPartners.length > 0 && (
          <MDBox
            sx={{
              height: "80px !important",
              pt: 3,
            }}
          >
            <FormControl sx={{ minWidth: 200, minHeight: 60 }} size="medium">
              <InputLabel id="select-small-label">Apoderado</InputLabel>
              <Select
                labelId="select-small-label"
                id="select-small"
                value={
                  values.partners.find(
                    (partner) => row.original.id === partner.id
                  )?.owner_id
                }
                label="Apoderado"
                onChange={(event) => handleOwnerChange(event, row)}
                sx={{ height: "30px !important" }}
              >
                {row.original.relatedPartners.map((partner) => (
                  <MenuItem p={1} value={partner.id}>
                    {partner.mergedName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MDBox>
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="warning"
              onClick={() =>
                router.push(`/partners/${row.original.id}/profile`)
              }
            >
              <Icon>edit</Icon>&nbsp;Editar
            </MDButton>
            <MDButton
              variant="text"
              color="error"
              onClick={() => {
                setIndex(row.index);
                setShowConfirmModal(true);
              }}
            >
              <Icon>delete</Icon>&nbsp;Borrar
            </MDButton>
          </MDBox>
        );
      },
    },
  ];

  const table = { columns, rows };

  return (
    <Grid container spacing={5} mt={2}>
      <Grid item xs={12} mb={5}>
        <MDBox
          py={2}
          borderRadius="lg"
          sx={{ border: 1, borderColor: "grey.400" }}
        >
          <DataTable table={table} showTotalEntries={false} isSorted={false} />
          <Modal
            open={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            height="auto"
          >
            <MDBox p={2}>
              <MDTypography variant="h4" mb={5}>
                ¿Está seguro que desea eliminar el rol del cliente?
              </MDTypography>
              <MDBox display="flex" justifyContent="end" gap={6}>
                <MDButton
                  variant="gradient"
                  color="light"
                  onClick={() => {
                    setShowConfirmModal(false);
                  }}
                >
                  Cancelar
                </MDButton>
                <MDButton
                  variant="gradient"
                  color="error"
                  onClick={() => {
                    deleteRow();
                    setShowConfirmModal(false);
                  }}
                >
                  Eliminar
                </MDButton>
              </MDBox>
            </MDBox>
          </Modal>
        </MDBox>
      </Grid>
    </Grid>
  );
}
