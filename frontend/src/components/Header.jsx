import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
const Header = ({ user = {} }) => {
  const [hasUser, setHasUser] = useState(false);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [user]);
  return (
    <Menu
      inverted
      size="large"
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
            Lessons
          </Menu.Item>
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
            to="/login"
          >
            Register
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, {})(Header);
