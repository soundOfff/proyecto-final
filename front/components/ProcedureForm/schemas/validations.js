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
  },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [responsible.name]: Yup.number(),
  [status.name]: Yup.number().nullable(),
  [stepNumber.name]: Yup.number().required(stepNumber.errorMsg),
  [description.name]: Yup.string().nullable(),
  [dependencies.name]: Yup.array(),
  [actions.name]: Yup.array(),
});
export default validations;
