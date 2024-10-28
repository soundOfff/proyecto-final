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
import { dispatchAction } from "/actions/action-types";

import { useDataProvider } from "/providers/DataProvider";
import { useState } from "react";
import Link from "next/link";
import { useMaterialUIController, setSnackbar } from "/context";

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

export default function ActionList() {
  const [_, dispatch] = useMaterialUIController();

  const { task } = useDataProvider();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionDispatched, setActionDispatched] = useState({});

  const handleDispatchAction = async (actionId) => {
    setActionLoading(true);
    try {
      const data = await dispatchAction(task.id, actionId);
      setSnackbar(dispatch, {
        color: "success",
        icon: "check_circle",
        title: "Exito al disparar la acción",
        content: "La acción fue disparada con éxito",
        bgWhite: true,
      });
      setActionDispatched({ ...actionDispatched, [actionId]: data.success });
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al disparar la acción",
        content: error?.message,
        bgWhite: true,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const renderRow = (type, row) => {
    if (type === ACTION_EXPENSE) {
      return (
        <MDTypography variant="caption" fontWeight="medium" color="text">
          Gasto
        </MDTypography>
      );
    } else if (type === ACTION_REQUEST) {
      return (
        <MDTypography variant="caption" fontWeight="medium" color="text">
          Solicitud
        </MDTypography>
      );
    } else if (type === ACTION_EMAIL) {
      return (
        <>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              {ACTION_TYPES[type]}: <b>{row.mail_to}</b>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <Link
              href={`/mail-templates/${row.mail_template_id}`}
              target="_blank"
            >
              <MDTypography variant="caption" fontWeight="regular" color="info">
                Ver el template usado
              </MDTypography>
            </Link>
          </MDBox>
        </>
      );
    } else {
      return (
        <MDTypography variant="caption" fontWeight="medium" color="text">
          Otro
        </MDTypography>
      );
    }
  };

  return (
    <>
      {task?.procedure?.actions.length > 0 && (
        <MDBox py={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" mb={2}>
            Lista de acciones disponibles
          </MDTypography>
          <Grid container xs={12} spacing={2}>
            {task?.procedure?.actions.map(
              (
                {
                  id,
                  action_type_id,
                  description,
                  is_dispatched,
                  mail_to,
                  mail_template_id,
                },
                index
              ) => (
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
                          Tipo de accion:
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
                      {/* TODO: Send more data of types */}
                      {renderRow(action_type_id, { mail_to, mail_template_id })}
                    </MDBox>
                    <MDBox mr={1}>
                      <Tooltip
                        title={
                          Boolean(is_dispatched) || actionDispatched[id]
                            ? "La accion ya fue previamente disparada"
                            : ""
                        }
                        arrow
                      >
                        <span>
                          <MDButton
                            variant="gradient"
                            color="dark"
                            size="small"
                            disabled={
                              Boolean(is_dispatched) ||
                              actionDispatched[id] ||
                              actionLoading
                            }
                            sx={{
                              height: "40px",
                              width: "120px",
                              p: 1,
                            }}
                            onClick={() => handleDispatchAction(id)}
                          >
                            Disparar accion &nbsp;{renderIcon(action_type_id)}
                          </MDButton>
                        </span>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                </Grid>
              )
            )}
          </Grid>
        </MDBox>
      )}
    </>
  );
}
