import checkout from "./form";

const {
  formField: { name, description, responsible, status, stepNumber },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
};

export default initialValues;
