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

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [country.name]: Yup.number().required(country.errorMsg),
  [idNumber.name]: Yup.string().required(idNumber.errorMsg),
  [idType.name]: Yup.string().required(idType.errorMsg),
  [email.name]: Yup.string().email().required(email.errorMsg),
  [phone.name]: Yup.string().required(phone.errorMsg),
  [civilStatus.name]: Yup.string().required(civilStatus.errorMsg),
  [isMale.name]: Yup.boolean().required(isMale.errorMsg),
  [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
  [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
  [birthDate.name]: Yup.string().nullable(),
  [occupation.name]: Yup.string().nullable(),
  [isConsolidatorPerson.name]: Yup.boolean().nullable(),
  [nationality.name]: Yup.number().nullable(),
});

export default validations;
