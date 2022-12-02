import { Header, Divider, Feed, Pagination } from "semantic-ui-react";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardActivities, fetchDashboardUser } from "../actions";
import { formatTime, totalPages } from "../utils";
import { viewFeedRows } from "../utils/constant";

const DashboardActivities = ({ activities, totalActivities }) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchDashboardActivities(activePage - 1));
  };
  useEffect(() => {
    dispatch(fetchDashboardActivities(activePage - 1));
  }, []);
  return (
    <div
      className="DashboardActivities ui vertical grid container"
      style={{ backgroundColor: "blue" }}
    >
      <div className="column">
        <div className="row ui segment">
          <Header>Activities</Header>
        </div>
        <Divider />
        <div className="row ui segment">
          <Feed size="large">
            {activities.map((activity, index) => {
              return (
                <Feed.Event
                  key={index}
                  className="ui align center"
                >
                  <Feed.Label>
                    <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
                  </Feed.Label>
                  <Feed.Content>
                    {activity.activityType == 1 && (
                      <Feed.Summary>
                        <Feed.User>{activity.username}</Feed.User> folllows{" "}
                        <Feed.User>{activity.followingUsername}</Feed.User>
                        <Feed.Date>{formatTime(activity.updatedAt)}</Feed.Date>
                      </Feed.Summary>
                    )}
                    {activity.activityType == 2 && (
                      <Feed.Summary>
                        <Feed.User>{activity.username}</Feed.User> learned{" "}
                        {activity.score} of {activity.total} in{" "}
                        <Link to={`/lessons/${activity.lessonId}`}>
                          {activity.lessonTitle}
                        </Link>
                        <Feed.Date>{formatTime(activity.updatedAt)}</Feed.Date>
                      </Feed.Summary>
                    )}
                    {/* <Feed.User>{username}</Feed.User> learned {activity.score}{" "} */}
                    {/* of {activity.total} in{" "} */}
                    {/* <Link to={`/lessons/${activity.id}`}> */}
                    {/* {activity.title} */}
                    {/* </Link> */}
                  </Feed.Content>
                </Feed.Event>
              );
            })}
          </Feed>
          <div className="ui center aligned grid">
            <Pagination
              activePage={activePage}
              pointing
              secondary
              totalPages={totalPages(totalActivities, viewFeedRows)}
              onPageChange={paginationHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => {
  return {
    totalActivities: dashboard.totalActivities,
    activities: dashboard.activities,
  };
};
export default connect(mapStateToProps, null)(DashboardActivities);
