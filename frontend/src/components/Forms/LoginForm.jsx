import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import server from "../../api/server";
import { validateLoginForm } from "../../utils";
const LoginForm = ({ modal, setModal, modalMsg, setModalMsg }) => {
  const navigate = useNavigate();
  const didMount = useRef(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateLoginForm(username, password));
  };
  const apiCall = () => {
    server
      .post("/api/auth/login", {
        username,
        password,
      })
      .then((response) => {
        window.localStorage.setItem("data", JSON.stringify(response.data));
        window.localStorage.setItem("accessToken", response.data.token);
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

  useEffect(() => {
    if (didMount.current) {
      let isValid = Object.values(errors).every((value) => value === "");
      if (isValid) {
        apiCall();
      } else {
        setHasError(true);
      }
    }
    didMount.current = true;
  }, [errors]);

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <Form
      className="ui small form"
      onSubmit={onSubmit}
      error={hasError}
    >
      <div className="ui stacked segment">
        <Form.Input
          className=""
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleUsername(e)}
          value={username}
          error={
            errors.username
              ? { content: errors.username, pointing: "left" }
              : false
          }
        />
        <Form.Input
          className=""
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e)}
          value={password}
          error={
            errors.password
              ? { content: errors.password, pointing: "left" }
              : false
          }
        />
        <button
          className="ui fluid tiny teal submit button"
          type="submit"
        >
          Login
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
