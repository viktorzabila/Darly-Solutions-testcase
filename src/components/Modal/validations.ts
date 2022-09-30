import * as Yup from "yup";
import { EMAIL_REG_EXP } from "../../helpers";

export const formResolver = Yup.object()
  .shape({
    firstName: Yup.string()
      .min(3, "Name must have at least length of 3 character")
      .required("This field is required"),
    lastName: Yup.string()
      .min(3, "Surname must have at least length of 3 character")
      .required("This field is required"),
    email: Yup.string()
      .matches(EMAIL_REG_EXP, "Should match emaill@example.com")
      .required("This field is required"),
    address: Yup.string(),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Gender must be one of the following values: Male, Female")
      .required("This field is required"),
  })
  .required();
