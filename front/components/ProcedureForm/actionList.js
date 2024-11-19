import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Icon from "@mui/material/Icon";
import {
  ACTION_TYPES,
  ACTION_EMAIL,
  ACTION_REQUEST,
} from "/utils/constants/actionTypes";
import Link from "next/link";

const renderMailItem = (actionTypeId, mailTo, mailTemplate) => (
  <>
    <MDBox mb={1} lineHeight={0}>
      <MDTypography variant="caption" fontWeight="regular" color="text">
        {ACTION_TYPES[actionTypeId]}
        :&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" fontWeight="medium">
          {mailTo}
        </MDTypography>
      </MDTypography>
    </MDBox>
    <MDBox mb={1} lineHeight={0}>
      <Link href={`/mail-templates/${mailTemplate}`} target="_blank">
        <MDTypography variant="caption" fontWeight="regular" color="info">
          Link a template usado
        </MDTypography>
      </Link>
    </MDBox>
  </>
);

const renderRequestItem = (actionTypeId, requestTemplate) => (
  <MDBox mb={1} lineHeight={0}>
    <MDTypography variant="caption" fontWeight="regular" color="text">
      {ACTION_TYPES[actionTypeId]}
      :&nbsp;&nbsp;&nbsp;
      <MDTypography variant="caption" fontWeight="medium">
        {requestTemplate}
      </MDTypography>
    </MDTypography>
  </MDBox>
);

export default function ActionList({ actions = [], options, deleteAction }) {
  return (
    <Grid item xs={12}>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {actions.map(
            (
              { action_type_id, mail_to, mail_template_id, description },
              index
            ) => (
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
                      {options.find((o) => o.id === action_type_id)?.label}
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
                        {description}
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                  {action_type_id === ACTION_EMAIL &&
                    renderMailItem(action_type_id, mail_to, mail_template_id)}
                  {action_type_id === ACTION_REQUEST &&
                    renderRequestItem(action_type_id, mail_template_id)}
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
            )
          )}
        </MDBox>
      </MDBox>
    </Grid>
  );
}
