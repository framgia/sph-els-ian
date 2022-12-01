import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Divider, Feed, Header, Image } from "semantic-ui-react";
import { viewProfile } from "../actions";
import { formatTime } from "../utils";
const ProfilePage = ({
  user: { username, avatar },
  followers,
  following,
  isFollowing,
  lessonsCompleted,
  wordsLearned,
  activities,
}) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [currTime, setCurrTime] = useState("");

  useEffect(() => {
    dispatch(viewProfile(userId));
    setInterval(() => {
      let nwDate = new Date();
      setCurrTime(nwDate);
    }, 1000);
  }, []);

  const handleFollow = (e) => {
    e.preventDefault();
  };
  return (
    <div className="ProfilePage Outlet">
      <div className="ui center aligned grid">
        <div className="row">
          <div className="four wide column">
            <div className="ui center aligned grid vertical">
              <div className="column">
                <div className="row">
                  <Image
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    size="medium"
                    centered
                  />
                </div>
                <div className="row ui segment">
                  <Header as="h2"> {username ? username : "Unknown"} </Header>
                </div>
                <Divider />
                <div
                  className="row ui segment"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <p>{followers}</p>
                    <p> Followers</p>
                  </div>
                  <div>
                    <p>{following} </p>
                    <p>Following</p>
                  </div>
                </div>
                <div className="row ui segment">
                  <Button>{isFollowing ? "Following" : "Follow"}</Button>
                </div>
                <div className="row ui segment">
                  {wordsLearned > 0 && (
                    <Header as="h4">Learned {wordsLearned} words</Header>
                  )}
                  {lessonsCompleted > 0 && (
                    <Header as="h4">Finished {lessonsCompleted} lessons</Header>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="one wide column"></div>
          <div className="seven wide column">
            <div className="row ui segment">
              <Header>Activities</Header>
            </div>
            <Divider />
            <div className="row ui segment">
              <Feed size="large">
                {activities.map((activity, index) => {
                  return (
                    <Feed.Event key={index}>
                      <Feed.Label>
                        <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
                      </Feed.Label>
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{username}</Feed.User> learned{" "}
                          {activity.score} of {activity.total} in{" "}
                          <Link to={`/lessons/${activity.id}`}>
                            {activity.title}
                          </Link>
                          <Feed.Date>
                            {formatTime(activity.updatedAt)}
                          </Feed.Date>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  );
                })}
              </Feed>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ profile }) => {
  return {
    user: profile.user,
    followers: profile.followers,
    following: profile.following,
    isFollowing: profile.following,
    lessonsCompleted: profile.lessonsCompleted,
    wordsLearned: profile.wordsLearned,
    activities: profile.activities,
  };
};
export default connect(mapStateToProps, null)(ProfilePage);
