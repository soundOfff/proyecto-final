import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

const FileList = ({ files = [], handleEditFile }) => {
  return (
    <Grid item xs={12}>
      <MDBox ml={6} display="flex" alignContent="center">
        {files && files.length > 0 && (
          <Grid container>
            {files.map((f, index) => (
              <Grid key={index} item xs={11} p={3} mb={2}>
                <MDBox mb={1} lineHeight={0}>
                  <FormField
                    name="file_name"
                    label="Nombre del archivo"
                    type="text"
                    value={f.name}
                    onChange={(e) => handleEditFile(f.file, e.target.value)}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        )}
      </MDBox>
    </Grid>
  );
};

export default FileList;
