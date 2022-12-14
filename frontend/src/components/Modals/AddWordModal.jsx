import { Modal, Button, Form, Message } from "semantic-ui-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import server from "../../api/server";
import { validateWordModal } from "../../utils";
import { fetchWords } from "../../actions";

const AddWordModal = ({ modal, setModal, offset }) => {
  let { lessonId } = useParams();
  const dispatch = useDispatch();
  const initialFormState = {
    newWord: "",
    choice0: "",
    choice1: "",
    choice2: "",
    choice3: "",
    duplicate: "",
    server: "",
  };
  const [newWord, setNewWord] = useState("");
  const [choice0, setChoice0] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const onSubmit = async (e) => {
    e.preventDefault();
    let sample = validateWordModal(newWord, choice0, choice1, choice2, choice3);
    setErrors(sample);
    if (Object.values(sample).every((value) => value === "")) {
      apiCall();
    }
  };

  const apiCall = () => {
    setIsLoading(true);
    server
      .post("/api/admin/addWord", {
        lesson_id: lessonId,
        new_word: newWord,
        choices: [choice0, choice1, choice2, choice3],
      })
      .then((response) => {
        setIsLoading(false);
        cancelModal();
        dispatch(fetchWords(offset, lessonId));
      })
      .catch((error) => {
        setIsLoading(false);
        let sample = validateWordModal(
          newWord,
          choice0,
          choice1,
          choice2,
          choice3
        );
        let msg = error.response
          ? error.response.data.message
          : "Server is down. Please try again later.";
        setErrors({ ...sample, server: msg });
      });
  };

  //Clear on Exit
  const cancelModal = () => {
    setModal(false);
    setNewWord("");
    setChoice0("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setIsLoading(false);
    setErrors(initialFormState);
  };

  //handlers
  const handleNewWord = (e) => {
    e.preventDefault(e);
    setNewWord(e.target.value);
  };
  const handleChoice = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "choice0":
        setChoice0(e.target.value);
        return;
      case "choice1":
        setChoice1(e.target.value);
        return;
      case "choice2":
        setChoice2(e.target.value);
        return;
      case "choice3":
        setChoice3(e.target.value);
        return;
      default:
        return;
    }
  };

  return (
    <Modal
      as={Form}
      centered={true}
      open={modal}
      onClose={() => cancelModal()}
      size="small"
      onSubmit={onSubmit}
      error
    >
      <Modal.Header>Add Word</Modal.Header>
      <Modal.Content>
        <div className="ui grid">
          <div className="row">
            <div className="two wide column"></div>
            <div className="six wide column">
              <Form.Input
                label="Word"
                size="large"
                type="text"
                placeholder="New Word"
                value={newWord}
                onChange={(e) => handleNewWord(e)}
                error={
                  errors.newWord
                    ? { content: errors.newWord, pointing: "right" }
                    : false
                }
              />
            </div>
            <div className="six wide column">
              <Form.Input
                label="Choices"
                size="large"
                type="text"
                placeholder="Answer"
                name="choice0"
                value={choice0}
                onChange={(e) => handleChoice(e)}
                error={
                  errors.choice0
                    ? { content: errors.choice0, pointing: "left" }
                    : false
                }
              />
              <Form.Input
                size="large"
                type="text"
                placeholder="Answer"
                name="choice1"
                value={choice1}
                onChange={(e) => handleChoice(e)}
                error={
                  errors.choice1
                    ? { content: errors.choice1, pointing: "left" }
                    : false
                }
              />
              <Form.Input
                size="large"
                type="text"
                placeholder="Answer"
                name="choice2"
                value={choice2}
                onChange={(e) => handleChoice(e)}
                error={
                  errors.choice2
                    ? { content: errors.choice2, pointing: "left" }
                    : false
                }
              />
              <Form.Input
                size="large"
                type="text"
                placeholder="Answer"
                name="choice3"
                value={choice3}
                onChange={(e) => handleChoice(e)}
                error={
                  errors.choice3
                    ? { content: errors.choice3, pointing: "left" }
                    : false
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="two wide column"></div>
            <div className="twelve wide column">
              {errors.duplicate && (
                <Message
                  error
                  header={errors.duplicate}
                />
              )}
              {errors.server && (
                <Message
                  error
                  header={errors.server}
                />
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => cancelModal()}
          negative
        />
        <Button
          content="Submit"
          type="submit"
          positive
          loading={isLoading}
          disabled={isLoading}
        />
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { offset: state.words.offset };
};
export default connect(mapStateToProps, null)(AddWordModal);
