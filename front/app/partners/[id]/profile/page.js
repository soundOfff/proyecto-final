import { show, getSelect as getPartnersSelect } from "/actions/partners";
import { getSelect as getCountriesSelect } from "/actions/countries";
import { update as updatePartner } from "/actions/partners";
import MDBox from "/components/MDBox";
import DetailForm from "./components/detail-form";
import InvoiceForm from "./components/invoice-form";
import Tabs from "./components/tabs";

export default async function Profile({ params: { id } }) {
  const partner = await show(id, {
    include: [
      "user.contacts",
      "country",
      "consolidator",
      "shippingCountry",
      "billingCountry",
    ],
  });
  const consolidators = await getPartnersSelect({
    "filter[is_consolidator]": 1,
  });
  const countries = await getCountriesSelect();

  return (
    <MDBox py={5}>
      <Tabs />
      {false ? (
        <DetailForm
          partner={partner}
          consolidators={consolidators}
          countries={countries}
          updatePartner={updatePartner}
        />
      ) : (
        <InvoiceForm partner={partner} countries={countries} />
      )}
    </MDBox>
  );
}
