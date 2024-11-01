import * as yup from "yup";

export const formSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    age: yup.number().nullable().defined(),
  })
  .required();
