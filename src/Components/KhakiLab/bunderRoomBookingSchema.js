import * as yup from "yup";

export const bunderRoomBookingSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{8,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  organization: yup
    .string()
    .trim()
    .required("Organization name is required"),

  bookingDate: yup
    .date()
    .typeError("Please select a valid date")
    .required("Date is required"),

  timing: yup
    .string()
    .required("Please select timing"),

  layout: yup
    .string()
    .required("Please select layout"),

  comments: yup
    .string()
    .trim()
    .max(300, "Maximum 300 characters allowed")
    .optional(),
});
