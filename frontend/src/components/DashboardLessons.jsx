import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Pagination } from "semantic-ui-react";
import { fetchDashboardLessons } from "../actions";
import { totalPages } from "../utils";
import { viewLessonsRows } from "../utils/constant";
const DashboardLessons = ({ quizzes, totalQuizzes }) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchDashboardLessons(activePage - 1));
  };
  useEffect(() => {
    dispatch(fetchDashboardLessons(activePage - 1));
  }, []);
  return (
    <div className="DashboardLessons ui centered">
      <Card.Group itemsPerRow={2}>
        {totalQuizzes > 0 ? (
          quizzes.map((quiz) => {
            return (
              <Card
                key={quiz.id}
                as={Link}
                to={`/results/${quiz.lessonId}`}
              >
                <Card.Content>
                  <Card.Header>
                    <span>{quiz.title}</span>
                  </Card.Header>
                  <Card.Description>
                    {quiz.score > 0
                      ? `${quiz.score} new words learned`
                      : `No new words learned`}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })
        ) : (
          <p>No Lessons Taken Start Now</p>
        )}
      </Card.Group>
      <Pagination
        activePage={activePage}
        pointing
        secondary
        totalPages={totalPages(totalQuizzes, viewLessonsRows)}
        onPageChange={paginationHandler}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    quizzes: state.dashboard.quizzes,
    totalQuizzes: state.dashboard.totalQuizzes,
  };
};

export default connect(mapStateToProps, null)(DashboardLessons);
