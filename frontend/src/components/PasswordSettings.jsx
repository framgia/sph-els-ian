import { Button, Form, Label, Input, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { useState } from "react";
import server from "../api/server";
import { validatePasswordSettings } from "../utils";
const PasswordSettings = ({ setModalMsg, setModal }) => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({
    currPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [hasError, setHasError] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    let sample = validatePasswordSettings(currPass, newPass, confirmPass);
    setErrors(sample);
    if (Object.values(sample).every((value) => value === "")) {
      setHasError(false);
      apiCall();
    } else {
      setHasError(true);
    }
  };

  const apiCall = () => {
    server
      .post("/user/changeUserPassword", {
        current_password: currPass,
        new_password: newPass,
      })
      .then((response) => {})
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

  const inputHandler = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "currPass":
        setCurrPass(e.target.value);
        return;
      case "newPass":
        setNewPass(e.target.value);
        return;
      case "confirmPass":
        setConfirmPass(e.target.value);
        return;
      default:
        return;
    }
  };

  return (
    <div className="PasswordSettings ui center aligned grid flex">
      <div className="fourteen wide column">
        <Form
          size="large"
          style={{ padding: "4em", backgroundColor: "#3094e6" }}
          onSubmit={onSubmit}
          error
        >
          <Form.Field inline>
            <Label size="big">Current Password</Label>
            <Input
              type="password"
              placeholder="Current Password"
              name="currPass"
              value={currPass}
              onChange={inputHandler}
            />
          </Form.Field>
          <Form.Field inline>
            <Label size="big">New Password</Label>
            <Input
              type="password"
              placeholder="New Password"
              name="newPass"
              value={newPass}
              onChange={inputHandler}
            />
          </Form.Field>
          <Form.Field inline>
            <Label size="big">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPass"
              value={confirmPass}
              onChange={inputHandler}
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit">Save</Button>
          </Form.Field>
        </Form>
        {hasError && (
          <Message error>
            {Object.keys(errors).map((error, index) => {
              return <Message.List key={index}>{errors[error]}</Message.List>;
            })}
          </Message>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { pUsername: state.user.username, pEmail: state.user.email };
};
export default connect(mapStateToProps, null)(PasswordSettings);
