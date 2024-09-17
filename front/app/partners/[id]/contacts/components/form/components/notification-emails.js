"use client";

import Switch from "/components/Switch";
import MDTypography from "/components/MDTypography";
import { Grid } from "@mui/material";
import form from "../schemas/form";

export default function NotificationEmails({ values, setFieldValue }) {
  const { formField } = form;
  const {
    projectEmails,
    taskEmails,
    ticketEmails,
    contractEmails,
    creditNoteEmails,
    invoiceEmails,
    estimateEmails,
  } = formField;

  return (
    <>
      <MDTypography variant="h6" fontWeight="medium" mt={4} mb={2}>
        Notificaciones de Email
      </MDTypography>
      <Grid container lineHeight={0} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Switch
            name={contractEmails.name}
            label={contractEmails.label}
            value={values[contractEmails.name]}
            onChange={(e) =>
              setFieldValue(contractEmails.name, e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={invoiceEmails.name}
            label={invoiceEmails.label}
            value={values[invoiceEmails.name]}
            onChange={(e) =>
              setFieldValue(invoiceEmails.name, e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={creditNoteEmails.name}
            label={creditNoteEmails.label}
            value={values[creditNoteEmails.name]}
            onChange={(e) =>
              setFieldValue(creditNoteEmails.name, e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={projectEmails.name}
            label={projectEmails.label}
            value={values[projectEmails.name]}
            onChange={(e) =>
              setFieldValue(projectEmails.name, e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={taskEmails.name}
            label={taskEmails.label}
            value={values[taskEmails.name]}
            onChange={(e) => setFieldValue(taskEmails.name, e.target.checked)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={ticketEmails.name}
            label={ticketEmails.label}
            value={values[ticketEmails.name]}
            onChange={(e) => setFieldValue(ticketEmails.name, e.target.checked)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Switch
            name={estimateEmails.name}
            label={estimateEmails.label}
            value={values[estimateEmails.name]}
            onChange={(e) =>
              setFieldValue(estimateEmails.name, e.target.checked)
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
