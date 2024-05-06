import FormComponent from "./components/form";
import MDBox from "/components/MDBox";

import { show as showProject } from "/actions/projects";
import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";

export default async function Update({ params: { id } }) {
  const partners = await getPartnerSelect();
  const statuses = await getAllStatuses();
  const serviceTypes = await getAllServiceTypes();
  const billingTypes = await getAllBillingTypes();
  const members = await selectMembers();

  const project = await showProject(id, {
    include: [
      "staffs",
      "defendant",
      "plaintiff",
      "billingType",
      "files",
      "serviceType",
      "status",
      "members",
      "responsiblePerson",
    ],
  });

  return (
    <MDBox>
      <FormComponent
        {...{
          project,
          partners,
          statuses,
          serviceTypes,
          members,
          billingTypes,
        }}
      />
    </MDBox>
  );
}
