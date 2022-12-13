import { Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="HomePage Container">
      <div className="ui center aligned middle aligned grid container">
        <div className="row">
          <div className="ten wide column">
            <div className="ui container">
              <Header as="h1">Want to Learn a Language?</Header>
              <Header as="h3">
                {" "}
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </Header>
              <div className="">
                <Button
                  as={Link}
                  color="black"
                  to="/login"
                >
                  Already a Member
                </Button>
                <Button
                  as={Link}
                  color="green"
                  to="/register"
                >
                  Ready for a new Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
