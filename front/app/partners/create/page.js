import {
  getSelect as getPartnersSelect,
  getAllIndustries,
  getAllSections,
} from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import { getAll as getAllPartnerTypes } from "/actions/partner-types";
import Form from "./components/form";

export default async function Create() {
  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });
  const notJuridicEntities = await getPartnersSelect({
    "filter[is_juridic]": false,
  });
  const countries = await getCountriesSelect();
  const partnerTypes = await getAllPartnerTypes();
  const industries = await getAllIndustries();
  const sections = await getAllSections();

  return (
    <Form
      consolidators={consolidators}
      notJuridicEntities={notJuridicEntities}
      countries={countries}
      partnerTypes={partnerTypes}
      industries={industries}
      sections={sections}
    />
  );
}
