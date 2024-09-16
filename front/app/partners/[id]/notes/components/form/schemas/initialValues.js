import checkout from "./form";

const {
  formField: { description },
} = checkout;

const initialValues = {
  [description.name]: "",
};

export default initialValues;
