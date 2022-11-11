import { useState, useEffect } from "react";
import { Button, Header, Card } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { fetchLesson } from "../../actions";

const LessonPage = ({ lesson }) => {
  let { lesson_id } = useParams();
  let [hasLesson, setHasLesson] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLesson(lesson_id));
  }, []);

  useEffect(() => {
    if (lesson.data === null || Object.keys(lesson.words).length === 0) {
      setHasLesson(false);
    } else {
      setHasLesson(true);
    }
  }, [lesson]);

  return (
    <div className="LessonPage Outlet">
      {hasLesson ? (
        <div className="ui centered grid">
          <div className="row">
            <div className="ten wide column">
              <Link
                to=".."
                relative="path"
              >
                <Button
                  className="ui left floated"
                  style={{ marginBottom: 5 }}
                >
                  Back to Lessons
                </Button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="ten wide column">
              <Header
                as="h1"
                className="centered"
                style={{ marginBottom: 20 }}
              >
                {lesson.data.title}
              </Header>
              <div className="ui justified container">
                <p>{lesson.data.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Button
              inverted
              color="green"
              disabled={lesson.hasTaken}
              as={Link}
              to={`/quiz/${lesson_id}`}
            >
              Start Quiz
            </Button>
          </div>
          <div className="row">
            <div className="ten wide column">
              <Header as="h2">Example Words</Header>
              <Card.Group itemsPerRow={5}>
                {lesson.words &&
                  lesson.words.map((word) => {
                    return (
                      <Card
                        key={word.id}
                        className="lessonPage"
                      >
                        <Card.Content>
                          <Card.Header className="center aligned">
                            {word.jp_word}
                          </Card.Header>
                          <Card.Description className="center aligned">
                            {word.Choices[0].word}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    );
                  })}
              </Card.Group>
            </div>
          </div>
        </div>
      ) : (
        <div className="ui vertical masthead center aligned segment">
          <h1>Lesson not Found</h1>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { lesson: state.lesson };
};
export default connect(mapStateToProps, null)(LessonPage);
