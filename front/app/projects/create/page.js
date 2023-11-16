import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";
import { store as storeProject } from "/actions/projects";
import Form from "./components/form";

export default async function NewProject() {
  const partners = await getPartnerSelect();
  const statuses = await getAllStatuses();
  const serviceTypes = await getAllServiceTypes();
  const billingTypes = await getAllBillingTypes();
  const members = await selectMembers();

  return (
    <Form
      {...{
        partners,
        statuses,
        serviceTypes,
        members,
        storeProject,
        billingTypes,
      }}
    />
  );
}
