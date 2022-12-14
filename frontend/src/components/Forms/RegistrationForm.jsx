import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import server from "../../api/server";
import { useForm } from "react-hook-form";
import { validateRegistrationForm } from "../../utils";
const RegistrationForm = ({ setModal, setModalMsg }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ Username, Email, Password }) => {
    apiCall(Username, Email, Password);
    // setErrors(validateRegistrationForm(username, email, password, cPassword));
  };

  const apiCall = ({ username, email, password }) => {
    server
      .post("/api/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        return navigate("/login");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setModalMsg({
            header: "503",
            description: "Server Unavailable",
          });
          setModal(true);
        } else {
          setModalMsg({
            header: error.response.statusText,
            description: error.response.data.message,
          });
          setModal(true);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label={<label style={{ display: "none" }}>Username</label>}
        type="text"
        placeholder="Username"
        id="username"
        error={
          errors.Username !== undefined
            ? { content: errors.Username.message, pointing: "below" }
            : false
        }
      >
        <input
          {...register("Username", {
            required: "Username is required",
            maxLength: 20,
          })}
        />
      </Form.Input>
      <Form.Input
        label={<label style={{ display: "none" }}>Email</label>}
        type="text"
        placeholder="Email"
        id="email"
        error={
          errors.Email !== undefined
            ? { content: errors.Email.message, pointing: "below" }
            : false
        }
      >
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email format is invalid",
            },
            maxLength: 20,
          })}
        />
      </Form.Input>
      <Form.Input
        label={<label style={{ display: "none" }}>Password</label>}
        type="password"
        placeholder="Password"
        id="password"
        error={
          errors.Password !== undefined
            ? { content: errors.Password.message, pointing: "below" }
            : false
        }
      >
        <input
          {...register("Password", {
            required: "Password is required",
            maxLength: 20,
          })}
        />
      </Form.Input>
      <Form.Input
        label={<label style={{ display: "none" }}>Confirm Password</label>}
        type="password"
        placeholder="Confirm Password"
        id="confirmpassword"
        error={
          errors.ConfirmPassword !== undefined
            ? { content: errors.ConfirmPassword.message, pointing: "below" }
            : false
        }
      >
        <input
          {...register("ConfirmPassword", {
            required: "Confirm Password is required",
            maxLength: 20,
            validate: {
              emailEqual: (value) =>
                value === getValues().Password ||
                "Confirm Password is not equal to password. Please try again.",
            },
          })}
        />
      </Form.Input>
      <Form.Field>
        <button
          className="ui fluid tiny teal submit button"
          type="submit"
        >
          Register
        </button>
      </Form.Field>
    </Form>
  );
};

export default RegistrationForm;
