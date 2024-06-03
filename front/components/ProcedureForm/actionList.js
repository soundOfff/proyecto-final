import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Icon from "@mui/material/Icon";
import { ACTION_TYPES } from "/utils/constants/actionTypes";

export default function ActionList({
  actions = [],
  options,
  procedure,
  deleteAction,
}) {
  return (
    <Grid item xs={12}>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {actions.map((el, index) => (
            <MDBox
              key={index}
              component="li"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor="grey-200"
              borderRadius="lg"
              p={3}
              mb={2}
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
                    {options.find((o) => o.id === el.action_type_id)?.label}
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
                <MDButton
                  variant="text"
                  color="error"
                  onClick={() => deleteAction(index)}
                >
                  <Icon>delete</Icon>&nbsp;Borrar
                </MDButton>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Grid>
  );
}
