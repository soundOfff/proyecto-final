"use client";
import Table from "./components/table";
import { useDataProvider } from "/providers/DataProvider";

export default function Notes() {
  const { project } = useDataProvider();

  return <Table rows={project.notes} />;
}
