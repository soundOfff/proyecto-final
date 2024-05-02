import MDBox from "/components/MDBox";

export default function Show({ params: { id } }) {
  return (
    <MDBox
      width="100%"
      display="flex"
      alignContent="center"
      justifyContent="center"
    >
      <MDBox p={5}>Edit generic pay {id}</MDBox>
      <MDBox>Details show page</MDBox>
    </MDBox>
  );
}
