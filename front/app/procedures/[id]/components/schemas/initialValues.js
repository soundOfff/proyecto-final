import checkout from "./form";

const {
  formField: {
    name,
    description,
    dependencies,
    responsible,
    status,
    stepNumber,
    actions,
    process,
  },
} = checkout;

const initialValues = {
  [process.name]: "",
  [name.name]: "",
  [description.name]: "",
  [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
  [dependencies.name]: [],
  [actions.name]: [],
};

export default initialValues;
