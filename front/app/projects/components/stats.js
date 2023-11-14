import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import {
  NOT_STARTED,
  DEVELOPING,
  WAITING,
  CANCELED,
  FINALIZED,
} from "/utils/constants/projectStatusLabels";

function setColor(label) {
  if (label === NOT_STARTED) {
    return "primary";
  } else if (label === DEVELOPING) {
    return "info";
  } else if (label === WAITING) {
    return "warning";
  } else if (label === CANCELED) {
    return "error";
  } else if (label === FINALIZED) {
    return "success";
  } else {
    return "dark";
  }
}

export default function Stats({ countByStatuses }) {
  return (
    <MDBox
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        pb: 2,
      }}
    >
      {countByStatuses.map((status) => (
        <MDBox key={status.label} display="flex" px={4}>
          <MDTypography variant="h3" sx={{ mt: 2 }}>
            {status.count}
          </MDTypography>
          <MDBadge
            border
            variant="contained"
            badgeContent={`${status.label}`}
            color={setColor(status.label)}
            size="xs"
            container
            sx={{ mx: 3, mt: 2, height: "2rem" }}
          />
        </MDBox>
      ))}
    </MDBox>
  );
}
