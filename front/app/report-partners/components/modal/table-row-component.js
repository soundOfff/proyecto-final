"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import numberFormat from "/utils/numberFormat";
import { TableRow } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

export default function TableRowComponent({ project}) {

  return (
    <TableRow>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          <Link href={`/projects/${project.id}`}>{project.id}</Link>
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          {project.name}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          ${numberFormat(project.totalPaid)}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          ${numberFormat(project.totalBilledCost)}
        </MDTypography>
      </MDBox>
      <MDBox
        component="td"
        textAlign="left"
        py={1}
        pr={1}
        pl={3}
        sx={borderBottom}
      >
        <MDTypography variant="body2" color="text" fontWeight="regular">
          ${numberFormat(project.totalBilledCost - project.totalPaid)}
        </MDTypography>
      </MDBox>

    </TableRow>
  );
}
