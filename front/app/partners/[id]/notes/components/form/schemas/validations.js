import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { description },
} = checkout;

const validations = Yup.object().shape({
  [description.name]: Yup.string().required(description.errorMsg),
});
export default validations;
