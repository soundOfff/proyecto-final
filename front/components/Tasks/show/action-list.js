"use client";

import { Grid, Tooltip } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import ReceiptIcon from "@mui/icons-material/Receipt";
import GavelIcon from "@mui/icons-material/Gavel";
import EmailIcon from "@mui/icons-material/Email";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import {
  ACTION_EXPENSE,
  ACTION_REQUEST,
  ACTION_EMAIL,
  ACTION_TYPES,
} from "/utils/constants/actionTypes";

const renderIcon = (type) => {
  if (type === ACTION_EXPENSE) {
    return <ReceiptIcon fontSize="medium" />;
  } else if (type === ACTION_REQUEST) {
    return <GavelIcon fontSize="medium" />;
  } else if (type === ACTION_EMAIL) {
    return <EmailIcon fontSize="medium" />;
  } else {
    return <TextFieldsIcon fontSize="medium" />;
  }
};

export default function ActionList({ actions = [] }) {
  return (
    <>
      {actions.length && (
        <MDBox py={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" mb={2}>
            Lista de acciones disponibles
          </MDTypography>
          <Grid container xs={12} spacing={2}>
            {actions.map((el, index) => (
              <Grid item xs={12} key={index}>
                <MDBox
                  key={index}
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="grey-200"
                  borderRadius="lg"
                  px={4}
                  py={1}
                >
                  <MDBox
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    lineHeight={1}
                  >
                    <MDBox mb={2}>
                      <MDTypography variant="button" fontWeight="medium">
                        Tipo de accion:{" "}
                        {/* {
                              options.find((o) => o.id === el.action_type_id)
                                ?.label
                            } */}
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={1} lineHeight={0}>
                      <MDTypography
                        variant="caption"
                        fontWeight="regular"
                        color="text"
                      >
                        {ACTION_TYPES[el.action_type_id]}
                        :&nbsp;&nbsp;&nbsp;
                        <MDTypography variant="caption" fontWeight="medium">
                          {el.name}
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={1} lineHeight={0}>
                      <MDTypography
                        variant="caption"
                        fontWeight="regular"
                        color="text"
                      >
                        Descripción:&nbsp;&nbsp;&nbsp;
                        <MDTypography
                          variant="caption"
                          fontWeight="medium"
                          textTransform="normal"
                        >
                          {el.description}
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox mr={1}>
                    <Tooltip
                      title={
                        Math.random() > 0.5 // This is only for testing, it should be el.is_disabled
                          ? "La accion ya fue previamente disparada"
                          : ""
                      }
                      arrow
                    >
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        disabled={Math.random() > 0.5}
                        sx={{
                          height: "40px",
                          width: "120px",
                          p: 1,
                        }}
                        onClick={() => {}}
                      >
                        Disparar accion &nbsp;{renderIcon(el.action_type_id)}
                      </MDButton>
                    </Tooltip>
                  </MDBox>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      )}
    </>
  );
}
