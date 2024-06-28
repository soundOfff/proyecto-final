"use client";

import MDBox from "/components/MDBox";

import { useDataProvider } from "/providers/DataProvider";

import { useEffect, useState } from "react";
import Table from "/components/Tasks/table-server";
import { useSearchParams } from "next/navigation";
import { getAll } from "/actions/tasks";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { Card } from "@mui/material";

export default function TableComponent() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 10 });
  const searchParams = useSearchParams();

  const {
    statuses,
    priorities,
    invoice,
    repeats,
    tagsData,
    partners,
    taskableItems,
    staffs,
    currentTimer,
    actionsData,
    tableFields,
  } = useDataProvider();

  useEffect(() => {
    getAll({
      "filter[taskable_id]": invoice.id,
      "filter[taskable_type]": INVOICE_TYPE,
      perPage: searchParams.get("perPage") || 10,
      page: searchParams.get("page") || 1,
      include: ["assigneds", "tags", "status", "dependencies", "author"],
    }).then((data) => {
      setTasks(data.data.tasks);
      setMeta(data.meta);
    });
  }, [invoice, searchParams]);

  return (
    <Card>
      <MDBox display="flex" justifyContent="flex-end" p={5}>
        <Table
          rows={tasks}
          meta={meta}
          priorities={priorities}
          repeats={repeats}
          taskableItems={taskableItems}
          tagsData={tagsData}
          dependencyTasks={tasks}
          partners={partners}
          staffs={staffs}
          statuses={statuses}
          currentTimer={currentTimer}
          actionsData={actionsData}
          tableFields={tableFields}
          invoice={invoice}
        />
      </MDBox>
    </Card>
  );
}
