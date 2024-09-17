import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { name, number, description },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [number.name]: Yup.string().required(number.errorMsg),
  [description.name]: Yup.string().required(description.errorMsg),
});
export default validations;
