import * as yup from "yup";

export const volunteerSchema = yup.object({
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

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Select a valid gender")
    .required("Gender is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .min(16, "Minimum age is 16")
    .max(100, "Invalid age")
    .required("Age is required"),

  education: yup
    .string()
    .trim()
    .required("Education is required"),

  profession: yup
    .string()
    .trim()
    .required("Profession is required"),

  about: yup
    .string()
    .trim()
    .min(20, "Please write at least 20 characters")
    .required("This field is required"),
});
