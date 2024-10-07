import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import Select from "/components/Select";
import form from "./schemas/form";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MDTypography from "/components/MDTypography";

export default function FormContent({
  staffs,
  setFieldValue,
  values,
  errors,
  touched,
}) {
  const { formField } = form;
  const { staff, title, body, url } = formField;
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const fullUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    setFieldValue(url.name, fullUrl);
  }, [pathname, setFieldValue, url, params]);

  return (
    <MDBox sx={{ p: 5 }}>
      <Grid container lineHeight={0} spacing={2}>
        <Grid item xs={12}>
          <MDTypography variant="h6" textAlign="center">
            Compartir en Slack
          </MDTypography>
        </Grid>
        <Grid item xs={12}>
          <Select
            value={values[staff.name]}
            options={staffs}
            optionLabel={(option) => option.name}
            fieldName={staff.name}
            inputLabel={staff.label}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={title.name}
            label={title.label}
            type={title.type}
            placeholder={title.placeholder}
            value={values[title.name]}
            error={errors[title.name] && touched[title.name]}
            success={values[title.name].length > 0 && !errors[title.name]}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name={body.name}
            label={body.label}
            type={body.type}
            placeholder={body.placeholder}
            value={values[body.name]}
            error={errors[body.name] && touched[body.name]}
            success={values[body.name].length > 0 && !errors[body.name]}
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
