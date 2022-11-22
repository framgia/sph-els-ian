import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Header, Button, Pagination } from "semantic-ui-react";
import { fetchLessons } from "../../actions";
import { totalPages } from "../../utils";
import { viewWordsRows } from "../../utils/constant";
const LessonCardsPage = ({ lessons }) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchLessons(activePage - 1));
  };

  useEffect(() => {
    dispatch(fetchLessons(activePage - 1));
  }, []);

  return (
    <div className="LessonPage Outlet">
      <div className="ui centered grid">
        <div className="row">
          <Header as="h1">Lessons</Header>
        </div>
        <div className="row">
          <div className="ten wide column">
            <Card.Group itemsPerRow={2}>
              {lessons.data &&
                lessons.data.map((lesson) => {
                  return (
                    <Card
                      key={lesson.id}
                      className="lesson"
                    >
                      <Card.Content>
                        <Card.Header>{lesson.title}</Card.Header>
                        <Card.Description className="ui justified container">
                          <span className="lesson">{lesson.description}</span>
                        </Card.Description>
                        <Card.Content extra>
                          <Link
                            to={`${lesson.id}`}
                            relative="path"
                          >
                            <Button
                              inverted
                              color="blue"
                              className="ui right floated"
                            >
                              See more
                            </Button>
                          </Link>
                        </Card.Content>
                      </Card.Content>
                    </Card>
                  );
                })}
            </Card.Group>
          </div>
        </div>
        <div className="row">
          <Pagination
            activePage={activePage}
            pointing
            secondary
            totalPages={totalPages(lessons.totalLessons, viewWordsRows)}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { lessons: state.lessons };
};
export default connect(mapStateToProps, null)(LessonCardsPage);
