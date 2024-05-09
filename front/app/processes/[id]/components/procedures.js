"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBadge from "/components/MDBadge";
import MDBox from "/components/MDBox";
import MDAvatar from "/components/MDAvatar";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { useMaterialUIController } from "/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getColor } from "/utils/project-state-colors";

export default function Procedures({ procedures }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const pathname = usePathname();

  const columns = [
    {
      Header: "Número",
      accessor: "stepNumber",
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Estado",
      accessor: "status",
      textAlign: "center",
      Cell: ({ value }) => {
        return (
          <MDBadge
            variant="contained"
            badgeContent={value.name}
            color={getColor(value.id)}
            size="xs"
            container
            sx={{ ml: 1, height: "2rem" }}
          />
        );
      },
    },
    {
      Header: "Responsable",
      accessor: "responsible",
      Cell: ({ value }) =>
        value && (
          <MDBox key={value.id} display="inline-block" mr={2}>
            {value.profileImage && (
              <MDAvatar
                src={value?.profileImage}
                alt="profile-image"
                size="md"
                shadow="sm"
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  height: "2rem",
                  width: "2rem",
                }}
              />
            )}
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              mr={2}
            >
              {value.name}
            </MDTypography>
          </MDBox>
        ),
    },
  ];

  const table = { columns, rows: procedures };

  return (
    <>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href={`${pathname}/create-procedure`}>
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Agregar Procedimiento
          </MDButton>
        </Link>
      </MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </>
  );
}
