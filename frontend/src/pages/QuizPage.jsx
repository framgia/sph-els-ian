import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchQuiz } from "../actions";
import { useParams } from "react-router-dom";
import { Button, Header, Loader, Progress } from "semantic-ui-react";
const QuizPage = ({ quiz, fetchQuiz }) => {
  const [currentItem, setCurrentItem] = useState(1);
  const [answers, setAnswers] = useState({});
  const { lesson_id } = useParams();

  useEffect(() => {
    fetchQuiz(lesson_id);
  }, []);

  useEffect(() => {
    if (quiz.words.length !== 0) {
      if (currentItem > quiz.words.length) {
        //TODO apiCall('/user/validateAnswers')
      }
    }
  }, [currentItem]);

  const Answer = (item, choice_id) => {
    let new_answers = answers;
    new_answers[item] = choice_id;
    setAnswers(new_answers);
    setCurrentItem(currentItem + 1);
  };

  return (
    <div className="QuizPage Outlet ui center aligned middle aligned grid">
      {quiz.words.length !== 0 && currentItem <= quiz.words.length ? (
        <div
          className="column"
          style={{ maxWidth: "80vh", backgroundColor: "#84bd93" }}
        >
          <div className="quiz ui container">
            <Progress
              value={currentItem}
              total={quiz.words.length}
              progress="value"
            />
            <h1>{quiz.words[currentItem - 1].jp_word}</h1>
            <Button.Group className="fluid vertical">
              {quiz.words[currentItem - 1].Choices.map((choice) => {
                return (
                  <Button
                    key={choice.id}
                    size="massive"
                    onClick={() =>
                      Answer(quiz.words[currentItem - 1].id, choice.id)
                    }
                  >
                    <span className="ui center aligned container">
                      {choice.word}
                    </span>
                  </Button>
                );
              })}
            </Button.Group>
          </div>
        </div>
      ) : (
        <div className="column">
          <div className="Placeholder">
            <Loader
              active
              size="large"
            >
              <Header as="h1"> Processing Score </Header>
            </Loader>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { quiz: state.quiz };
};
export default connect(mapStateToProps, { fetchQuiz })(QuizPage);
