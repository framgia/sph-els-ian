import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const DashboardEmpty = () => {
  return (
    <div className="DashboardEmpty Container">
      {/* <div
        className="ui center aligned middle aligned grid"
        style={{ backgroundColor: "red" }}
      >
        <div className="column">
          <div className="row">
          </div>
        </div>
      </div> */}
      <div className="ui center aligned middle aligned grid container">
        <div className="column">
          <div className="row">
            <h1>Oops looks like you haven't started yet.</h1>
            <Button
              as={Link}
              color="green"
              to="/lessons"
            >
              Start Lessons
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardEmpty;
