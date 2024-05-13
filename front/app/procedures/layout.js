import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

export default function Layout({ children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {children}
      <Footer />
    </DashboardLayout>
  );
}
