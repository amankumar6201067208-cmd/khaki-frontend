import * as yup from "yup";

export const donationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]{8,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  address: yup
    .string()
    .trim()
    .required("Residence address is required"),

  pan: yup
    .string()
    .trim()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN number"
    )
    .required("PAN card details are required"),

  amount: yup
    .number()
    .typeError("Donation amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Donation amount is required"),

  comments: yup.string().nullable(),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept Terms & Conditions"),
});
