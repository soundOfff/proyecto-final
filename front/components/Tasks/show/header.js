import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { useDataProvider } from "/providers/DataProvider";

export default function Header() {
  const { task } = useDataProvider();
  return (
    <MDBox bgColor="dark" variant="gradient" px={5} py={3}>
      <MDTypography variant="h5" color="white">
        {task.name}
      </MDTypography>
    </MDBox>
  );
}
