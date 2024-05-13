import checkout from "./form";

const {
  formField: { name, description, responsible, status, stepNumber, process },
} = checkout;

const initialValues = {
  [process.name]: "",
  [name.name]: "",
  [description.name]: "",
  [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
};

export default initialValues;
