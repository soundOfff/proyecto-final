import Index from "../../components/form/index";
import MDBox from "/components/MDBox";

import { show as showProject } from "/actions/projects";
import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";
import { getSelect as getSelectProposals } from "/actions/proposals";
import { getAll as getRoles } from "/actions/partner-project-roles";
import { getAll as getAllCourts } from "/actions/courts";

export default async function Update({ params: { id } }) {
  const partners = await getPartnerSelect();
  const statuses = await getAllStatuses();
  const serviceTypes = await getAllServiceTypes();
  const billingTypes = await getAllBillingTypes();
  const members = await selectMembers();
  const proposals = await getSelectProposals();
  const roles = await getRoles();
  const courts = await getAllCourts();

  const project = await showProject(id, {
    include: [
      "staffs",
      "billablePartner",
      "billingType",
      "files",
      "serviceType",
      "status",
      "members",
      "responsiblePerson",
      "partners",
      "proposal",
      "notes",
      "court",
    ],
  });

  return (
    <MDBox>
      <Index
        {...{
          project,
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
  );
}
