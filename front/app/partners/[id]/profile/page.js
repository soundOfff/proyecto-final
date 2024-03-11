import { show, getSelect as getPartnersSelect } from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import Form from "./components/form";

export default async function Profile({ params: { id } }) {
  const partner = await show(id, {
    include: [
      "user.contacts",
      "country",
      "consolidator",
      "shippingCountry",
      "billingCountry",
      "jurisdiction.district.province",
    ],
  });

  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });

  const countries = await getCountriesSelect();

  return (
    <Form
      partner={partner}
      consolidators={consolidators}
      countries={countries}
    />
  );
}
