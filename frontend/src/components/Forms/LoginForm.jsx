import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import server from "../../api/server";
import { setUser } from "../../actions";
import { isEmpty } from "../../utils";
import { useForm } from "react-hook-form";

const LoginForm = ({ setModal, setModalMsg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isEmpty(errors)) {
      apiCall(data);
    }
  };

  const apiCall = ({ Username, Password }) => {
    server
      .post("/api/auth/login", {
        username: Username,
        password: Password,
      })
      .then((response) => {
        window.localStorage.setItem("data", JSON.stringify(response.data));
        window.localStorage.setItem("accessToken", response.data.token);
        dispatch(setUser(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setModalMsg({
            header: "503",
            description: "Server Unavailable. Please try again later.",
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
          type="password"
          id="password"
          placeholder="Password"
          {...register("Password", {
            required: "Password is required",
            maxLength: 20,
          })}
        />
      </Form.Input>
      <Form.Field>
        <Button
          color="teal"
          size="large"
          fluid
          type="submit"
        >
          Login
        </Button>
      </Form.Field>
    </Form>
  );
};

export default LoginForm;
