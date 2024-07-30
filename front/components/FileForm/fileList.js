import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

const FileList = ({ files = [], handleEditFile }) => {
  if (files.length == 0) {
    return;
  }
  return (
    <Grid item xs={12}>
      <MDBox p={2}>
        <MDTypography variant="body1" color="dark" my={2}>
          Archivos
        </MDTypography>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {files.map((f, index) => (
            <MDBox
              key={index}
              component="li"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                <MDBox mb={1} lineHeight={0}>
                  <FormField
                    name="file_name"
                    label="Nombre del archivo"
                    type="text"
                    placeholder=""
                    value={f.name}
                    onChange={(e) => handleEditFile(f.file, e.target.value)}
                  />
                </MDBox>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Grid>
  );
};

export default FileList;
