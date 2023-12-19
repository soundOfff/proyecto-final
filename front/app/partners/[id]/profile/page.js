import Form from "./components/form";
import Header from "./components/header";
import { show, getSelect as getPartnersSelect } from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import { update as updatePartner } from "/actions/partners";

export default async function Profile({ params: { id } }) {
  const partner = await show(id, {
    include: ["user.contacts", "country", "consolidator"],
  });
  const primaryContact = partner.user.contacts.find(
    (contact) => contact?.isPrimary == true
  );
  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });
  const countries = await getCountriesSelect();

  return (
    <>
      <Header contact={primaryContact} />
      <Form
        partner={partner}
        consolidators={consolidators}
        countries={countries}
        updatePartner={updatePartner}
      />
    </>
  );
}
