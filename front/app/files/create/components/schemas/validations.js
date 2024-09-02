import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { file, fileableType, fileableId },
} = checkout;

const validations = Yup.object().shape({
  [file.name]: Yup.mixed()
    .required(file.errorMsg)
    .test("fileSize", "El archivo es muy grande", (value) => {
      return value.size <= 2000000;
    }),
  [fileableType.name]: Yup.string().required(fileableType.errorMsg),
  [fileableId.name]: Yup.number().required(fileableId.errorMsg),
});
export default validations;
