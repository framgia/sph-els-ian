import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
const Header = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link
          to="/"
          className="item"
        >
          Home
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/admin/lessons">Lessons</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
