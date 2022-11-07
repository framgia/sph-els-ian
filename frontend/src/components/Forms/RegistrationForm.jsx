import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import server from "../../api/server";
import { validateRegistrationForm } from "../../utils";
const RegistrationForm = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [errors, setErrors] = useState({
    noUsername: true,
    noPassword: true,
    noC_password: true,
    cPassError: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateRegistrationForm(username, password, c_password));
  };

  const apiCall = () => {
    server
      .post("/api/auth/register", {
        username,
        password,
      })
      .then((response) => {
        return navigate("/login");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          props.setModalMsg({
            header: "503",
            description: "Server Unavailable",
          });
          props.setModal(true);
        } else {
          props.setModalMsg({
            header: error.response.statusText,
            description: error.response.data.message,
          });
          props.setModal(true);
        }
      });
  };

  useEffect(() => {
    let isValid = Object.values(errors).every((value) => value === false);
    if (isValid) {
      apiCall();
    }
  }, [errors]);

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleCpassword = (e) => {
    e.preventDefault();
    setC_password(e.target.value);
  };

  return (
    <Form
      className="ui small form"
      onSubmit={onSubmit}
    >
      <div className="ui stacked segment">
        <Form.Input
          required
          className="register"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleUsername(e)}
          value={username}
        />
        <Form.Input
          required
          className=""
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e)}
          value={password}
        />
        <Form.Input
          required
          className=""
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={(e) => handleCpassword(e)}
          value={c_password}
          error={
            errors.cPassError
              ? {
                  content: "Please re-type confirm password",
                  pointing: "above",
                }
              : null
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

export default RegistrationForm;
