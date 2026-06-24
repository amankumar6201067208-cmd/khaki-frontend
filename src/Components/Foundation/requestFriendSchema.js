import * as yup from "yup";

export const requestFriendSchema = yup.object({
  yourName: yup
    .string()
    .trim()
    .required("Your name is required"),

  yourEmail: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Your email is required"),

  friendName: yup
    .string()
    .trim()
    .required("Friend's name is required"),

  friendEmail: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Friend's email is required"),
});
