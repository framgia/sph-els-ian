import { Button, Image, Form, Label, Input, Message } from "semantic-ui-react";
import { connect, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import server from "../api/server";
import { validateProfileSettings } from "../utils";
import { fetchUser } from "../actions";
const ProfileSettings = ({ pUsername, pEmail, setModalMsg, setModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const didMount = useRef(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });
  const [hasError, setHasError] = useState(false);
  const [isDifferent, setIsDifferent] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    let sample = validateProfileSettings(username, email);
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
      .post("/user/changeUserProfile", {
        username,
        email,
      })
      .then((response) => {
        dispatch(fetchUser());
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
    //load current username and email
    setUsername(pUsername);
    setEmail(pEmail);
  }, [pUsername, pEmail]);

  useEffect(() => {
    //enable button if there's a change
    setIsDifferent(false);
    if (username !== pUsername) {
      setIsDifferent(true);
    }
    if (email !== pEmail) {
      setIsDifferent(true);
    }
  }, [username, email]);

  const usernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return (
    <div className="ProfileSettings ui center aligned grid flex">
      <div className="eleven wide column">
        <Form
          size="large"
          style={{ padding: "4em", backgroundColor: "#3094e6" }}
          onSubmit={onSubmit}
          error
        >
          <Form.Field inline>
            <Label size="big">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={usernameHandler}
            />
          </Form.Field>
          <Form.Field inline>
            <Label size="big">Email</Label>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={emailHandler}
            />
          </Form.Field>
          <Form.Field>
            <Button
              type="submit"
              disabled={!isDifferent}
            >
              Save
            </Button>
          </Form.Field>
        </Form>
        {hasError && (
          <Message
            error
            list={[
              errors.username ? errors.username : undefined,
              errors.email ? errors.email : undefined,
            ]}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { pUsername: state.user.username, pEmail: state.user.email };
};
export default connect(mapStateToProps, null)(ProfileSettings);
