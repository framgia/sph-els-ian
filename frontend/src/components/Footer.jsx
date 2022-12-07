import { Header, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <div className="div">
          Copyright <Icon name="copyright outline" />
          2022 IanUrriza. All Rights Reserved
        </div>
      </div>
    </div>
  );
};
export default Footer;
