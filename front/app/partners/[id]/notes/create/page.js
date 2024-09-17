import FormComponent from "../components/form/form";

export default function Create({ params: { id } }) {
  return <FormComponent partnerId={id} />;
}
