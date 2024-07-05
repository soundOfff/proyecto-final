import * as Yup from "yup";
import checkout from "./form";

const {
  formField: {
    name,
    description,
    responsible,
    dependencies,
    status,
    stepNumber,
    actions,
    reminders,
  },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [responsible.name]: Yup.number(),
  [status.name]: Yup.number().nullable(),
  [stepNumber.name]: Yup.number().required(stepNumber.errorMsg),
  [description.name]: Yup.string(),
  [dependencies.name]: Yup.array(),
  [actions.name]: Yup.array(),
  [reminders.name]: Yup.array(),
});
export default validations;
