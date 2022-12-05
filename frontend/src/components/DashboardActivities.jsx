import { Header, Divider, Feed, Pagination, Popup } from "semantic-ui-react";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardActivities, fetchDashboardUser } from "../actions";
import { formatTime, totalPages } from "../utils";
import { viewFeedRows } from "../utils/constant";
import { imgUrl } from "../utils/constant";
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
                    <img src={`${imgUrl}/user/avatar/${activity.userId}`} />
                  </Feed.Label>
                  <Feed.Content>
                    {activity.activityType == 1 && (
                      <Feed.Summary>
                        <Link to={`/users/${activity.userId}`}>
                          {activity.username}
                        </Link>{" "}
                        folllows{" "}
                        <Link to={`/users/${activity.followingId}`}>
                          {activity.followingUsername}
                        </Link>
                        <Popup
                          content={activity.updatedAt}
                          trigger={
                            <Feed.Date>
                              {formatTime(activity.updatedAt)}
                            </Feed.Date>
                          }
                        />
                      </Feed.Summary>
                    )}
                    {activity.activityType == 2 && (
                      <Feed.Summary>
                        <Link to={`/users/${activity.userId}`}>
                          {activity.username}
                        </Link>{" "}
                        learned {activity.score} of {activity.total} in{" "}
                        <Link to={`/lessons/${activity.lessonId}`}>
                          {activity.lessonTitle}
                        </Link>
                        <Popup
                          content={activity.updatedAt}
                          trigger={
                            <Feed.Date>
                              {formatTime(activity.updatedAt)}
                            </Feed.Date>
                          }
                        />
                      </Feed.Summary>
                    )}
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
