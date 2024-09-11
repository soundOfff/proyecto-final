import checkout from "./form";

const {
  formField: { court, number, description },
} = checkout;

const initialValues = {
  [court.name]: "",
  [number.name]: "",
  [description.name]: "",
};

export default initialValues;
