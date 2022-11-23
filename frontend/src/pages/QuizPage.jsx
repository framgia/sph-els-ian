import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchQuiz } from "../actions";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Loader, Progress } from "semantic-ui-react";
import server from "../api/server";
import ErrorModal from "../components/Modals/ErrorModal";
const QuizPage = ({ quiz, fetchQuiz }) => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(1);
  const [answers, setAnswers] = useState({});
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ header: "", description: "" });
  const { lessonId } = useParams();

  useEffect(() => {
    fetchQuiz(lessonId);
  }, []);

  useEffect(() => {
    if (quiz.words.length !== 0) {
      if (currentItem > quiz.words.length) {
        server
          .post("/user/submitQuiz", { lesson_id: lessonId, answers })
          .then(() => {
            navigate(`/results/${lessonId}`);
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              setModalMsg({
                header: "503",
                description: "Server Unavailable",
              });
              setModal(true);
            } else {
              setModalMsg({
                header: error.response.status,
                description: error.response.data.message,
              });
              setModal(true);
            }
          });
      }
    }
  }, [currentItem]);

  const Answer = (item, choiceId) => {
    let newAnswers = answers;
    newAnswers[item] = choiceId;
    setAnswers(newAnswers);
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
                    {choice.word}
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
      <ErrorModal
        modal={modal}
        setModal={setModal}
        modalMsg={modalMsg}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { quiz: state.quiz };
};
export default connect(mapStateToProps, { fetchQuiz })(QuizPage);
