import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { useDataProvider } from "/providers/DataProvider";

export default function Header() {
  const { task } = useDataProvider();
  return (
    <MDBox bgColor="dark" variant="gradient" px={5} py={4}>
      <MDTypography variant="h4" color="white">
        {task.name}
      </MDTypography>
    </MDBox>
  );
}
