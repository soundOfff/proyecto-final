"use client";

import MDBox from "/components/MDBox";
import Table from "./table";
import { useEffect, useState } from "react";
import { useDataProvider } from "/providers/DataProvider";
import { getAll } from "/actions/credits";
import { Card } from "@mui/material";

export default function Credits() {
  const { creditNote } = useDataProvider();
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    getAll({
      "filter[invoice_id]": creditNote.id,
      include: ["invoice", "creditNote", "staff"],
    }).then((data) => setCredits(data.data.credits));
  }, [creditNote]);

  return (
    <Card>
      <MDBox p={5}>
        <Table rows={credits} />
      </MDBox>
    </Card>
  );
}
