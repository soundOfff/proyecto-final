import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { task, endTime, staff, note, startTime, tags },
} = checkout;

const validations = Yup.object().shape({
  [task.name]: Yup.number(),
  [startTime.name]: Yup.date().required(startTime.errorMsg),
  [endTime.name]: Yup.date().required(endTime.errorMsg),
  [note.name]: Yup.string(),
  [staff.name]: Yup.number().required(staff.errorMsg),
  [tags.name]: Yup.array(),
});

export default validations;
