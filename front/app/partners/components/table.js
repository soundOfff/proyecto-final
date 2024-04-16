"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import { Link, Switch } from "@mui/material";
import { DescriptionOutlined } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { destroy } from "../../../actions/files";

export default function Table({ rows }) {
  const handleDeleteFile = async (fileId) => {
    await destroy(fileId);
  };
  const columns = [
    { Header: "#", accessor: "id" },
    {
      Header: "Empresa",
      accessor: "company",
      Cell: ({ row }) =>
        row.original.name ? (
          <Link href={`partners/${row.original.id}/profile`} color="info">
            {row.original.name}
          </Link>
        ) : (
          <Link href={`partners/${row.original.id}/profile`} color="info">
            {row.original.company}
          </Link>
        ),
    },
    {
      id: "contactName",
      Header: "Contacto Principal",
      accessor: "contacts",
      Cell: ({ value }) => {
        return value && value[0]
          ? `${value[0].firstName} ${value[0].lastName}`
          : null;
      },
    },
    {
      id: "contactEmail",
      Header: "Email principal",
      accessor: "contacts",
      Cell: ({ value }) => {
        return value && value[0] ? value[0].email : null;
      },
    },
    { Header: "Teléfono", accessor: "phoneNumber" },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => {
        const label = { inputProps: { "aria-label": "Is active switch" } };
        return <Switch {...label} checked={Boolean(value)} />;
      },
    },
    { Header: "Fecha de Creación", accessor: "createdAt" },
    {
      Header: "Archivos",
      accessor: "files",
      width: "20%",
      textAlign: "center",
      Cell: ({ row }) => {
        return (
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ gap: 1, width: "100%" }}
          >
            {row.original.files.map((file) => (
              <MDBox
                key={file.id}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="between"
                p={0.75}
                sx={{
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                  gap: 1,
                }}
              >
                <DescriptionOutlined fontSize="medium" color="dark" />
                <Link href={file.publicUrl}>
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                  >
                    {file.subject.length > 10
                      ? file.subject.substring(0, 10) + "..."
                      : file.subject}
                  </MDTypography>
                </Link>
                <CancelIcon
                  color="error"
                  onClick={() => handleDeleteFile(file.id)}
                  sx={{ cursor: "pointer" }}
                />
              </MDBox>
            ))}
          </MDBox>
        );
      },
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
