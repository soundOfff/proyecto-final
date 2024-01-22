"use client";

import MDBox from "/components/MDBox";
import DetailForm from "./detail-form";
import InvoiceForm from "./invoice-form";
import Tabs from "./tabs";
import { useState } from "react";

export default function Form({ partner, consolidators, countries }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MDBox py={5}>
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {tabIndex === 0 ? (
        <DetailForm
          partner={partner}
          consolidators={consolidators}
          countries={countries}
        />
      ) : (
        <InvoiceForm partner={partner} countries={countries} />
      )}
    </MDBox>
  );
}