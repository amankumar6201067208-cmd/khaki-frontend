import * as yup from "yup";

export const checkoutSchema = yup.object({
  contact: yup.object({
    name: yup.string().trim().required("Name is required"),

    email: yup
      .string()
      .trim()
      .email("Invalid email")
      .required("Email is required"),

    country: yup
      .string()
      .trim()
      .required("Country is required"),

    countryCode: yup
      .string()
      .trim()
      .required("Country code is required"),

    phone: yup
      .string()
      .trim()
      .matches(/^[0-9]{8,15}$/, "Invalid phone number")
      .required("Phone is required"),
  }),

  passengers: yup.array().of(
    yup.object({
      name: yup.string().trim().notRequired(),

      email: yup
        .string()
        .trim()
        .email("Invalid email")
        .notRequired(),

      phone: yup
        .string()
        .trim()
        .matches(/^[0-9]{8,15}$/, {
          message: "Invalid phone number",
          excludeEmptyString: true,
        })
        .notRequired(),
    })
  ),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms & Conditions to proceed"),
});