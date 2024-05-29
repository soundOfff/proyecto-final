import checkout from "./form";

const {
  formField: {
    name,
    description,
    responsible,
    status,
    stepNumber,
    dependencies,
  },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
  [dependencies.name]: [],
};

export default initialValues;
