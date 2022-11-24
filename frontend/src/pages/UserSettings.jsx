import { Menu } from "semantic-ui-react";
import { useState } from "react";
import AvatarSettings from "../components/AvatarSettings";
import ProfileSettings from "../components/ProfileSettings";
import PasswordSettings from "../components/PasswordSettings";
import ErrorModal from "../components/Modals/ErrorModal";
const UserSettings = () => {
  const [activeItem, setActiveItem] = useState("Avatar");
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ header: "", description: "" });
  const renderSettingsComponent = () => {
    let options = {
      modal,
      setModal,
      modalMsg,
      setModalMsg,
    };

    switch (activeItem) {
      case "Avatar":
        return <AvatarSettings {...options} />;
      case "Profile":
        return <ProfileSettings {...options} />;
      case "Password":
        return <PasswordSettings {...options} />;
      default:
        return <AvatarSettings {...options} />;
    }
  };
  return (
    <div className="UserSettings Outlet">
      <div
        className="ui center aligned middle aligned grid"
        style={{ minHeight: "80vh" }}
      >
        <div className="ui grid container">
          <div className="row">
            <div className="five wide column">
              <Menu
                fluid
                vertical
                tabular
              >
                <Menu.Item
                  name="Avatar"
                  active={activeItem === "Avatar"}
                  onClick={() => {
                    setActiveItem("Avatar");
                  }}
                />
                <Menu.Item
                  name="Profile"
                  active={activeItem === "Profile"}
                  onClick={() => {
                    setActiveItem("Profile");
                  }}
                />
                <Menu.Item
                  name="Password"
                  active={activeItem === "Password"}
                  onClick={() => {
                    setActiveItem("Password");
                  }}
                />
              </Menu>
            </div>
            <div className="eleven wide column stretched">
              {renderSettingsComponent()}
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        modal={modal}
        setModal={setModal}
        modalMsg={modalMsg}
      />
    </div>
  );
};
export default UserSettings;
