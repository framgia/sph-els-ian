import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";
import server from "../../api/server";
import { validateRegistrationForm } from "../../utils";
const RegistrationForm = ({ setModal, setModalMsg }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({
    noUsername: true,
    noPassword: true,
    noEmail: true,
    noCPassword: true,
    cPassError: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateRegistrationForm(username, email, password, cPassword));
  };

  const apiCall = () => {
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
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleCPassword = (e) => {
    e.preventDefault();
    setCPassword(e.target.value);
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
          className="register"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleEmail(e)}
          value={email}
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
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleCPassword(e)}
          value={cPassword}
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
