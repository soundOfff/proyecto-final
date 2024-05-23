"use client";

import MDBox from "/components/MDBox";
import DetailForm from "./detail-form";
import InvoiceForm from "./invoice-form";
import Tabs from "./tabs";
import { useState } from "react";

export default function Form({
  partner,
  consolidators,
  notJuridicEntities,
  countries,
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MDBox>
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {tabIndex === 0 ? (
        <DetailForm
          partner={partner}
          notJuridicEntities={notJuridicEntities}
          consolidators={consolidators}
          countries={countries}
        />
      ) : (
        <InvoiceForm partner={partner} countries={countries} />
      )}
    </MDBox>
  );
}
