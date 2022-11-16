export const validateRegistrationForm = (
  username,
  password,
  cPassword = "",
  errors
) => {
  if (username === "") {
    errors = { ...errors, noUsername: true };
  } else {
    errors = { ...errors, noUsername: false };
  }
  if (password === "") {
    errors = { ...errors, noPassword: true };
  } else {
    errors = { ...errors, noPassword: false };
  }
  if (cPassword === "") {
    errors = { ...errors, noCPassword: true };
  } else {
    errors = { ...errors, noCPassword: false };
  }
  if (password === cPassword && password !== "") {
    errors = { ...errors, cPassError: false };
  } else {
    errors = { ...errors, cPassError: true };
  }
  return errors;
};

export const validateLoginForm = (username, password, errors) => {
  errors = {
    username: "",
    password: "",
  };
  if (username === "") {
    errors = { ...errors, username: "Missing Username" };
  }

  if (password === "") {
    errors = { ...errors, password: "Missing Password" };
  }
  return errors;
};

export const validateLessonModal = (title, description) => {
  let errors = {
    title: "",
    description: "",
    server: "",
  };
  if (title === "") {
    errors = { ...errors, title: "Missing Title" };
  }

  if (description === "") {
    errors = { ...errors, description: "Missing Description" };
  }
  return errors;
};

export const validateWordModal = (
  newWord,
  choice0,
  choice1,
  choice2,
  choice3
) => {
  let errors = {
    newWord: "",
    choice0: "",
    choice1: "",
    choice2: "",
    choice3: "",
    duplicate: "",
    server: "",
  };
  if (newWord === "") {
    errors = { ...errors, newWord: "Missing Word" };
  }
  if (choice0 === "") {
    errors = { ...errors, choice0: "Missing Choice" };
  }
  if (choice1 === "") {
    errors = { ...errors, choice1: "Missing Choice" };
  }
  if (choice2 === "") {
    errors = { ...errors, choice2: "Missing Choice" };
  }
  if (choice3 === "") {
    errors = { ...errors, choice3: "Missing Choice" };
  }
  if (errors.choice0 || errors.choice1 || errors.choice2 || errors.choice3) {
  } else {
    if (new Set([choice0, choice1, choice2, choice3]).size !== 4) {
      errors = {
        ...errors,
        duplicate: "Please remove the duplicate choice",
      };
    }
  }

  return errors;
};

export const totalPages = (total, maxView) => {
  return Math.ceil(total / maxView) || 1;
};
