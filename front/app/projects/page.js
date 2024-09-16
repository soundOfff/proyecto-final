import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";

import {
  getAll as getAllProjects,
  getCountByStatuses,
} from "/actions/projects";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";
import { getSelect as getSelectProposals } from "/actions/proposals";
import { getAll as getRoles } from "/actions/partner-project-roles";
import { getAll as getAllCourts } from "/actions/courts";

import Table from "./components/table";
import Filters from "./components/filters";
import Stats from "./components/stats";

const include = [
  "staffs",
  "billablePartner",
  "billingType",
  "files",
  "serviceType",
  "status",
  "members",
  "responsiblePerson",
  "proposal",
  "notes",
  "court",
];

export const dynamic = "force-dynamic";

export default async function Projects({ searchParams }) {
  const { statusId, search, perPage = 10, page = 1 } = searchParams;

  const statusFilter = statusId ? { "filter[status]": statusId } : null;
  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...statusFilter,
    ...searchFilter,
    perPage,
    page,
  };

  const {
    meta,
    data: { projects },
  } = await getAllProjects(params);
  const statuses = await getAllStatuses();

  const countByStatuses = await getCountByStatuses();
  const partners = await getPartnerSelect();
  const serviceTypes = await getAllServiceTypes();
  const billingTypes = await getAllBillingTypes();
  const members = await selectMembers();
  const proposals = await getSelectProposals();
  const roles = await getRoles();
  const courts = await getAllCourts();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats countByStatuses={countByStatuses} />
            <Filters statuses={statuses} />
            <MDBox py={1}>
              <Table
                rows={projects}
                meta={meta}
                formData={{
                  partners,
                  statuses,
                  serviceTypes,
                  members,
                  billingTypes,
                  proposals,
                  roles,
                  courts,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
