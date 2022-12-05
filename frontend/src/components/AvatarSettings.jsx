import { Button, Image, Message } from "semantic-ui-react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import server from "../api/server";
import { checkFileSize, checkFileType } from "../utils";
import { maxFileSize, validImageTypes } from "../utils/constant";
const AvatarSettings = ({ userId }) => {
  let imgUrl = process.env.REACT_APP_API_URL;
  const inputFile = useRef(null);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let sent = e.target.value;
    if (sent == undefined || sent == "" || sent == null) {
      return;
    }
    if (sent === "empty") {
      apiCall();
      return;
    }
    if (!checkFileType(e.target.files[0], validImageTypes)) {
      setError("Invalid Type. Please upload in jpeg, webp, or png formats.");
      return;
    }
    if (!checkFileSize(e.target.files[0], maxFileSize)) {
      setError("File is too large. Please try again.");
      return;
    }
    apiCall(e.target.files[0]);
  };

  const apiCall = (avatar = null) => {
    let formData = new FormData();
    if (avatar !== null) {
      formData.set("avatar", avatar);
    }
    server
      .post("/user/changeUserAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setUpdate(!update);
      });
  };
  return (
    <div className="ui center aligned middle aligned grid flex">
      <div className="column">
        <div className="row">
          {userId && (
            <Image
              src={`${imgUrl}/user/avatar/${userId}?${Date.now()}`}
              circular
              size="medium"
              centered
              style={{
                marginBottom: "3em",
                maxHeight: "300px",
              }}
            />
          )}
        </div>
        <div className="row">
          <input
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={(e) => handleSubmit(e)}
            accept=".png,.webp,.jpg"
          />
          <Button
            primary
            onClick={() => inputFile.current.click()}
          >
            Change Avatar
          </Button>
          <Button
            secondary
            value="empty"
            onClick={(e) => handleSubmit(e)}
          >
            Remove Avatar
          </Button>
        </div>
        <Message
          error
          hidden={!error}
        >
          {error}
        </Message>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userId: state.user.id };
};
export default connect(mapStateToProps, null)(AvatarSettings);
