import checkout from "./form";

const {
  formField: { file, fileableId, fileableType },
} = checkout;

const initialValues = {
  [file.name]: "",
  [fileableId.name]: "",
  [fileableType.name]: "",
};

export default initialValues;
