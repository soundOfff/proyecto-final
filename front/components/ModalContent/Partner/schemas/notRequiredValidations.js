import * as Yup from "yup";
import form from "./form";

const {
  formField: {
    name,
    birthDate,
    expeditionDate,
    isMale,
    country,
    email,
    civilStatus,
    occupation,
    phone,
    idNumber,
    idType,
    number,
    birthPlace,
    isConsolidator: isConsolidatorPerson,
    nationality,
  },
} = form;

const notRequiredValidations = Yup.object().shape({
  [name.name]: Yup.string(),
  [country.name]: Yup.number(),
  [idNumber.name]: Yup.string(),
  [idType.name]: Yup.string(),
  [email.name]: Yup.string().email(),
  [phone.name]: Yup.string(),
  [civilStatus.name]: Yup.string(),
  [isMale.name]: Yup.boolean(),
  [birthPlace.name]: Yup.string(),
  [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
  [birthDate.name]: Yup.string().nullable(),
  [occupation.name]: Yup.string().nullable(),
  [isConsolidatorPerson.name]: Yup.boolean().nullable(),
  [nationality.name]: Yup.number().nullable(),
});

export default notRequiredValidations;
