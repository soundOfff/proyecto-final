import { Grid, Link } from "@mui/material";
import { DescriptionOutlined } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function UploadFileList({ files = null, handleDeleteFile }) {
  return (
    <MDBox mb={4}>
      <MDTypography variant="body1" fontWeight="medium" color="dark" my={2}>
        Archivos subidos
      </MDTypography>
      <Grid container>
        {files.map((file) => (
          <MDBox
            key={file.id}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="between"
            sx={{
              border: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
              gap: 1,
              px: 2,
              py: 1,
              mx: 2,
              width: "auto",
            }}
          >
            <DescriptionOutlined fontSize="medium" color="dark" />
            <Link href={file.publicUrl}>
              <MDTypography variant="button" fontWeight="regular" color="dark">
                {file.subject}
              </MDTypography>
            </Link>
            <CancelIcon
              color="error"
              onClick={() => handleDeleteFile(file.id)}
              sx={{ cursor: "pointer" }}
            />
          </MDBox>
        ))}
      </Grid>
    </MDBox>
  );
}
