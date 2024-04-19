"use client";

import { useEffect, useState } from "react";
import Table from "./components/table";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import { getAll } from "/actions/estimates";
import Link from "next/link";
import Loader from "../components/loader";

export default function Estimates({ project }) {
  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll({
      "filter[project_id]": project.id,
      include: ["project", "partner"],
    }).then((data) => {
      setEstimates(data.data.estimates);
      setIsLoading(false);
    });
  }, [project]);

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link
          href={{
            pathname: "/estimates/create",
            query: { projectId: project.id },
          }}
        >
          <MDButton variant="gradient" color="dark">
            Registrar Proforma
          </MDButton>
        </Link>
      </MDBox>
      {isLoading ? <Loader /> : <Table rows={estimates} />}
    </MDBox>
  );
}
