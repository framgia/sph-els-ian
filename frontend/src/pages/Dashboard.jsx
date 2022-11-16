import { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Card, Header, Image } from "semantic-ui-react";
import { Link, Outlet } from "react-router-dom";
import user_logo from "../images/blank_profile.jpeg";
import DashboardWords from "../components/DashboardWords";
import DashboardLessons from "../components/DashboardLessons";
import { fetchDashboardUser } from "../actions";
const Dashboard = ({ dashboard }) => {
  const dispatch = useDispatch();
  const [onDisplay, setOnDisplay] = useState("words"); // words, lessons, activities

  useEffect(() => {
    dispatch(fetchDashboardUser());
  }, []);

  const renderDashboardComponent = () => {
    switch (onDisplay) {
      case "words":
        return <DashboardWords />;
      case "lessons":
        return <DashboardLessons />;
      case "activities":
      //TODO return <DashboardActivities />;
      default:
        return "w";
    }
  };
  return (
    <div className="Dashboard Outlet">
      <div className="ui centered three column grid">
        <div className="row">
          <div className="three wide column">
            <Card
              fluid
              style={{ backgroundColor: "transparent" }}
            >
              <Card.Content>
                <Image
                  floated="left"
                  size="tiny"
                  src={user_logo}
                  circular
                />
                <Card.Header className="middle aligned">
                  <span>
                    {dashboard.user?.username
                      ? dashboard.user.username
                      : "John Smith"}
                  </span>
                </Card.Header>
                <Card.Content>
                  {dashboard.wordsLearned > 0 && (
                    <Card.Description>
                      <a onClick={() => setOnDisplay("words")}>
                        Learned {dashboard.wordsLearned} words
                      </a>
                    </Card.Description>
                  )}
                  {dashboard.completeLessons > 0 && (
                    <Card.Description>
                      <a onClick={() => setOnDisplay("lessons")}>
                        Learned {dashboard.completeLessons} lessons
                      </a>
                    </Card.Description>
                  )}
                </Card.Content>
              </Card.Content>
            </Card>
          </div>
          <div className="nine wide column">{renderDashboardComponent()}</div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { dashboard: state.dashboard };
};
export default connect(mapStateToProps, null)(Dashboard);
