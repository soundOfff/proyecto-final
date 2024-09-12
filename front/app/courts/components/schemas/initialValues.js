import checkout from "./form";

const {
  formField: { name, number, description },
} = checkout;

const initialValues = {
  [name.name]: "",
  [number.name]: "",
  [description.name]: "",
};

export default initialValues;
