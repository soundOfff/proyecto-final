"use client";

import { Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";

export default function ResponsiveTableContent({ row }) {
  return (
    <Grid container spacing={4} width="80vw">
      {row.cells.map((cell) => {
        return (
          <>
            <Grid item xs={6}>
              <MDTypography variant="body2">{cell.column.Header}</MDTypography>
            </Grid>
            <Grid item xs={6}>
              {cell.render("Cell")}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
