import { Modal, Button, Form, Message } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import server from "../../api/server";
import { validateWordModal } from "../../utils";
import { fetchWords } from "../../actions";

const WordModal = ({
  modal,
  setModal,
  offset,
  modalData,
  setModalData,
  initialModalData,
}) => {
  let { lessonId } = useParams();
  const dispatch = useDispatch();
  const initialErrorState = {
    newWord: "",
    choice0: "",
    choice1: "",
    choice2: "",
    choice3: "",
    duplicate: "",
    server: "",
  };
  const [newWord, setNewWord] = useState(modalData.jp_word);
  const [choice0, setChoice0] = useState(modalData.choices[0].word);
  const [choice1, setChoice1] = useState(modalData.choices[1].word);
  const [choice2, setChoice2] = useState(modalData.choices[2].word);
  const [choice3, setChoice3] = useState(modalData.choices[3].word);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrorState);
  const [isDifferent, setIsDifferent] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    let sample = validateWordModal(newWord, choice0, choice1, choice2, choice3);
    setErrors(sample);
    if (Object.values(sample).every((value) => value === "")) {
      apiCall();
    }
  };

  const apiCall = () => {
    if (modalData.id !== 0) {
      setIsLoading(true);
      server
        .post("/api/admin/editWord", {
          word_id: modalData.id,
          word: newWord,
          choices: [choice0, choice1, choice2, choice3],
        })
        .then((response) => {
          console.log(response);
          cancelModal();
          dispatch(fetchWords(offset, lessonId));
        })
        .catch((error) => {
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
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
    }
  };

  //Clear on Exit
  const cancelModal = () => {
    setModal(false);
    setIsLoading(false);
    setErrors(initialErrorState);
    setModalData(initialModalData);
    setIsDifferent(false);
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

  useEffect(() => {
    setNewWord(modalData.jp_word);
    setChoice0(modalData.choices[0].word);
    setChoice1(modalData.choices[1].word);
    setChoice2(modalData.choices[2].word);
    setChoice3(modalData.choices[3].word);
  }, [modalData]);

  useEffect(() => {
    setIsDifferent(false);
    if (newWord !== modalData.jp_word) {
      setIsDifferent(true);
    }
    if (choice0 !== modalData.choices[0].word) {
      setIsDifferent(true);
    }
    if (choice1 !== modalData.choices[1].word) {
      setIsDifferent(true);
    }
    if (choice2 !== modalData.choices[2].word) {
      setIsDifferent(true);
    }
    if (choice3 !== modalData.choices[3].word) {
      setIsDifferent(true);
    }
  }, [newWord, choice0, choice1, choice2, choice3]);
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
          disabled={isLoading || !(isLoading || isDifferent)}
        />
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { offset: state.words.offset };
};
export default connect(mapStateToProps, null)(WordModal);
