import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { court, number, description },
} = checkout;

const validations = Yup.object().shape({
  [court.name]: Yup.string().required(court.errorMsg),
  [number.name]: Yup.number().required(number.errorMsg),
  [description.name]: Yup.string().required(description.errorMsg),
});
export default validations;
