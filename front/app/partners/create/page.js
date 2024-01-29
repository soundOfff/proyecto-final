import { getSelect as getPartnersSelect } from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import Form from "./components/form";

export default async function Create() {
  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });

  const countries = await getCountriesSelect();

  return <Form consolidators={consolidators} countries={countries} />;
}
