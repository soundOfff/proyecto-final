import checkout from "./form";

const {
  formField: { endTime, staff, note, startTime, task, tags },
} = checkout;

const initialValues = {
  [task.name]: "",
  [startTime.name]: "",
  [endTime.name]: "",
  [note.name]: "",
  [staff.name]: "",
  [tags.name]: [],
};

export default initialValues;
