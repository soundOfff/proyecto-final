import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { name, description, responsible, status, stepNumber },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [responsible.name]: Yup.number(),
  [status.name]: Yup.number().nullable(),
  [stepNumber.name]: Yup.number().required(stepNumber.errorMsg),
  [description.name]: Yup.string(),
});
export default validations;
