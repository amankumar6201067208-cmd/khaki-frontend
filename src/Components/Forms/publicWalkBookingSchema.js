import * as yup from "yup";

export const publicWalkBookingSchema = yup.object({
  participants: yup
    .array()
    .of(
      yup.object({
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
          .matches(
            /^[0-9]{8,15}$/,
            "Enter a valid phone number"
          )
          .required("Phone number is required"),

        category: yup
          .string()
          .oneOf(
            ["general", "senior", "student"],
            "Invalid category"
          )
          .required("Please select a category"),
      })
    )
    .min(1, "At least one participant is required")
    .required(),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms & Conditions to proceed"),
});
