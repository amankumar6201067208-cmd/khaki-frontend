import * as yup from "yup";

// Only the PRIMARY participant (participants[0]) must provide name / email /
// phone — those become the booking contact and the PayU payer. Extra tickets
// only need a category (defaulted to "general"), so a user booking 5 tickets
// no longer has to fill 5 full forms. The category drives the student/senior
// discount, so it stays required on every ticket.
const isPrimary = (ctx) =>
  ctx.path === "participants[0]" || ctx.path?.startsWith("participants[0].");

export const publicWalkBookingSchema = yup.object({
  participants: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .trim()
          .test("primary-name", "Name is required", function (value) {
            return isPrimary(this) ? !!value : true;
          }),

        email: yup
          .string()
          .trim()
          .email("Invalid email address")
          .test("primary-email", "Email is required", function (value) {
            return isPrimary(this) ? !!value : true;
          }),

        phone: yup
          .string()
          .trim()
          .matches(/^[0-9]{8,15}$/, {
            message: "Enter a valid phone number",
            excludeEmptyString: true,
          })
          .test("primary-phone", "Phone number is required", function (value) {
            return isPrimary(this) ? !!value : true;
          }),

        category: yup
          .string()
          .oneOf(["general", "senior", "student"], "Invalid category")
          .required("Please select a category"),
      })
    )
    .min(1, "At least one participant is required")
    .required(),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms & Conditions to proceed"),
});
