import {
  show,
  getSelect as getPartnersSelect,
  getAllSections,
  getAllIndustries,
} from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import { getAll as getAllPartnerTypes } from "/actions/partner-types";
import Form from "/app/partners/components/form/components/form";

export default async function Profile({ params: { id } }) {
  const partner = await show(id, {
    include: [
      "contacts",
      "country",
      "consolidator",
      "shippingCountry",
      "relatedPartners",
      "billingCountry",
      "jurisdiction.district.province",
    ],
  });

  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });
  const notJuridicEntities = await getPartnersSelect({
    "filter[is_juridic]": false,
  });

  const partnerTypes = await getAllPartnerTypes();
  const countries = await getCountriesSelect();
  const industries = await getAllIndustries();
  const sections = await getAllSections();

  return (
    <Form
      partner={partner}
      notJuridicEntities={notJuridicEntities}
      consolidators={consolidators}
      countries={countries}
      industries={industries}
      sections={sections}
      partnerTypes={partnerTypes}
    />
  );
}
