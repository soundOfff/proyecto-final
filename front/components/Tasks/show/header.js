import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function Header({ task }) {
  return (
    <MDBox bgColor="dark" variant="gradient" px={5} py={4}>
      <MDTypography variant="h2" color="white">
        {task.name}
      </MDTypography>
    </MDBox>
  );
}
