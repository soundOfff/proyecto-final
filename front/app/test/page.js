import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

export default function Test() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Testing</h1>
      <Footer />
    </DashboardLayout>
  );
}
