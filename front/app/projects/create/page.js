import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllBillingTypes } from "/actions/project-billing-types";
import { select as selectMembers } from "/actions/staffs";
import { store as storeProject } from "/actions/projects";
import { getAll as getRoles } from "/actions/partner-project-roles";
import { getAll as getAllCourts } from "/actions/courts";
import Index from "../components/form/index";

export default async function NewProject() {
  const partners = await getPartnerSelect();
  const statuses = await getAllStatuses();
  const serviceTypes = await getAllServiceTypes();
  const billingTypes = await getAllBillingTypes();
  const members = await selectMembers();
  const roles = await getRoles();
  const {
    data: { courts },
  } = await getAllCourts();

  return (
    <Index
      {...{
        partners,
        statuses,
        serviceTypes,
        members,
        storeProject,
        billingTypes,
        roles,
        courts,
      }}
    />
  );
}
