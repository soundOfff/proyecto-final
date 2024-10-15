import checkout from "./form";

const {
  formField: {
    name,
    description,
    // responsible,
    status,
    stepNumber,
    dependencies,
    actions,
  },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  // [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
  [dependencies.name]: [],
  [actions.name]: [],
};

export default initialValues;
