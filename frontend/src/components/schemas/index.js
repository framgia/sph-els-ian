import * as yup from "yup";
export const wordModalSchema = yup.object().shape({
  newWord: yup.string().required("New Word is required"),
  choice0: yup
    .string()
    .required("Answer is required")
    .notOneOf(
      [yup.ref("choice1"), yup.ref("choice2"), yup.ref("choice3")],
      "Answer must be unique"
    ),
  choice1: yup
    .string()
    .required("Answer is required")
    .notOneOf(
      [yup.ref("choice0"), yup.ref("choice2"), yup.ref("choice3")],
      "Answer must be unique"
    ),
  choice2: yup
    .string()
    .required("Answer is required")
    .notOneOf(
      [yup.ref("choice1"), yup.ref("choice0"), yup.ref("choice3")],
      "Answer must be unique"
    ),
  choice3: yup
    .string()
    .required("Answer is required")
    .notOneOf(
      [yup.ref("choice1"), yup.ref("choice2"), yup.ref("choice0")],
      "Answer must be unique"
    ),
});
