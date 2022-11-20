import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { removeUser } from "../actions";
const Header = ({ hasUser, removeUser }) => {
  return (
    <Menu
      inverted
      size="large"
      className="Header"
    >
      <Menu.Item
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>
      {hasUser ? (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/admin/lessons"
          >
            Admin-Lessons
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/lessons"
          >
            Lessons
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/settings"
          >
            Settings
          </Menu.Item>
          <Menu.Item onClick={() => removeUser()}>Logout</Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
          >
            Login
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/register"
          >
            Register
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default connect(null, { removeUser })(Header);
