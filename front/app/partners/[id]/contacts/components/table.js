"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDAvatar from "/components/MDAvatar";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { usePathname, useRouter } from "next/navigation";

export default function Table({ rows }) {
  const router = useRouter();
  const path = usePathname();
  const handleAddContact = () => {
    router.push(`${path}/create`);
  };

  const columns = [
    {
      Header: "Nombre Completo",
      accessor: "id",
      Cell: ({ row }) => (
        <MDBox display="flex" alignItems="center">
          {row.original.profileImage && (
            <MDAvatar
              src={`/images/contacts/${row.original.profileImage}`}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          )}
          <MDTypography ml={2} variant="body2">
            {row.original.name}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Posición/Cargo",
      accessor: "title",
    },
    {
      Header: "Número de Teléfono",
      accessor: "phoneNumber",
    },
    {
      Header: "Dirección",
      accessor: "direction",
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="end" mb={4}>
        <MDButton variant="contained" color="dark" onClick={handleAddContact}>
          Agregar Contacto
        </MDButton>
      </MDBox>
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
