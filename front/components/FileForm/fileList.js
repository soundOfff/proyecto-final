import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";

const FileList = ({ files = [], removeFile = () => {} }) => {
  if (files.length == 0) {
    return;
  }
  return (
    <Grid item xs={12}>
      <MDBox p={2}>
        <MDTypography variant="body2" color="dark" mb={2}>
          Archivos
        </MDTypography>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {files.map((file, index) => (
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
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="text"
                  >
                    <MDTypography variant="caption" fontWeight="medium">
                      Nombre:{" "}
                      {file.name +
                        "." +
                        file.file.upload.filename.split(".")[1]}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="gray"
                  >
                    <MDTypography variant="caption" fontWeight="medium">
                      Peso del archivo: {(file.file.size / 1000).toFixed(2)} KB
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox mr={1}>
                <MDButton
                  variant="text"
                  color="error"
                  onClick={() => removeFile(file.name)}
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
};

export default FileList;
