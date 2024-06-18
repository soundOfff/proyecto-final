import checkout from "./form";

const {
  formField: {
    name,
    description,
    responsible,
    status,
    stepNumber,
    dependencies,
    actions,
    reminders,
  },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  [responsible.name]: "",
  [status.name]: "",
  [stepNumber.name]: "",
  [dependencies.name]: [],
  [actions.name]: [],
  [reminders.name]: [],
};

export default initialValues;
