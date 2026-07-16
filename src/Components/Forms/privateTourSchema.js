import * as yup from "yup";

export const privateTourSchema = yup.object().shape({
  title: yup.string().required("Title is required"),

  name: yup.string().trim().required("Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be digits only")
    .min(8, "Too short")
    .max(15, "Too long")
    .required("Phone is required"),

  country: yup.string().required("Country is required"),

  countryCode: yup.string().trim().required("Country code is required"),

  preferredDate: yup.string().required("Date is required"),

  startTime: yup.string().required("Start Time is required"),

  endTime: yup.string().required("End Time is required"),

  people: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("Please select number of people")
    .required("No. of People is required"),

  acceptedTerms: yup.boolean().oneOf([true], "You must accept terms"),
});
