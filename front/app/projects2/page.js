// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { getAll as getAllProjects } from "/actions/projects";

import { getAll as getAllStatuses } from "/actions/project-statuses";

import Table from "./components/table";
import Filters from "./components/filters";

const include = [
  "stages",
  "notes",
  "status",
  "jurisdiction",
  "defendant",
  "plaintiff",
  "responsiblePerson",
  "lawFirm",
  "staffs",
];

export default async function Projects({ searchParams }) {
  let filter = null;
  let project = null;
  const { statusId } = searchParams;

  if (statusId) {
    filter = { "filter[status]": statusId };
  }

  const params = { include, ...filter };
  const projects = await getAllProjects(params);
  const statuses = await getAllStatuses();

  const { t, lang } = useTranslation("common");

  const columns = [
    { Header: "Cliente", accessor: "responsiblePerson.firstName" },
    { Header: "Saldo/Capital", accessor: "amount" },
    { Header: "Firma Asignada", accessor: "lawFirm.name" },
    { Header: "Jurisdicción", accessor: "jurisdiction.name" },
    { Header: "Estado", accessor: "status.label" },
    { Header: "Etapa", accessor: "stages[0].startTimestamp" },
    { Header: "Comentarios", accessor: "notes[0].content" },
    { Header: "Acciones", accessor: "actions", textAlign: "center" },
  ];

  return (
    <MDBox my={5}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              display="flex"
              justifyContent="space-between"
              pt={3}
              px={3}
              mb={4}
            >
              <MDTypography
                width={"fit-content"}
                variant="h6"
                fontWeight="medium"
              >
                {t("title")}
              </MDTypography>
              <Filters statuses={statuses} />
              <Link href="/projects/create">
                <MDButton variant="gradient" color="dark">
                  New Project
                </MDButton>
              </Link>
            </MDBox>
            <MDBox py={1}>
              <Table columns={columns} rows={projects} />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
