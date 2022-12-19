import { Modal, Button, Form, Message } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import server from "../../api/server";
import { fetchWords } from "../../actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { wordModalSchema } from "../schemas";
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

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(wordModalSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = ({ newWord, choice0, choice1, choice2, choice3 }) => {
    const payload = {
      word_id: modalData.id > 0 ? modalData.id : undefined,
      lesson_id: modalData.id > 0 ? undefined : lessonId,
      word: modalData.id > 0 ? newWord : undefined,
      new_word: modalData.id > 0 ? undefined : newWord,
      choices: [choice0, choice1, choice2, choice3],
    };
    apiCall(payload);
  };
  useEffect(() => {
    setValue("newWord", modalData.jp_word);
    setValue("choice0", modalData.choices[0].word);
    setValue("choice1", modalData.choices[1].word);
    setValue("choice2", modalData.choices[2].word);
    setValue("choice3", modalData.choices[3].word);
  }, [modalData]);

  const apiCall = (payload) => {
    if (payload.word_id) {
      setIsLoading(true);
      server
        .post("/api/admin/editWord", payload)
        .then((response) => {
          cancelModal();
          dispatch(fetchWords(offset, lessonId));
        })
        .catch((error) => {
          let msg = error.response
            ? error.response.data.message
            : "Server is down. Please try again later.";
          setError("server", { type: "custom", message: msg });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      server
        .post("/api/admin/addWord", payload)
        .then((response) => {
          cancelModal();
          dispatch(fetchWords(offset, lessonId));
        })
        .catch((error) => {
          let msg = error.response
            ? error.response.data.message
            : "Server is down. Please try again later.";
          setError("server", { type: "custom", message: msg });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Clear on Exit
  const cancelModal = () => {
    setModal(false);
    setIsLoading(false);
    reset();
    setModalData(initialModalData);
  };

  return (
    <Modal
      as={Form}
      centered={true}
      open={modal}
      onClose={() => cancelModal()}
      size="small"
      onSubmit={handleSubmit(onSubmit)}
      error
    >
      <Modal.Header>Add Word</Modal.Header>
      <Modal.Content>
        <div className="ui grid">
          <div className="row">
            <div className="two wide column"></div>
            <div className="six wide column">
              <Form.Input
                label={<label style={{ display: "none" }}>New Word</label>}
                id="newWord"
                placeholder="New Word"
                size="large"
                error={
                  errors.newWord !== undefined
                    ? { content: errors.newWord.message, pointing: "above" }
                    : false
                }
              >
                <input {...register("newWord", {})} />
              </Form.Input>
            </div>
            <div className="six wide column">
              <Form.Input
                label={<label style={{ display: "none" }}>choice0</label>}
                id="choice0"
                placeholder="Answer"
                size="large"
                error={
                  errors.choice0 !== undefined
                    ? { content: errors.choice0.message, pointing: "below" }
                    : false
                }
              >
                <input {...register("choice0", {})} />
              </Form.Input>
              <Form.Input
                label={<label style={{ display: "none" }}>choice1</label>}
                id="choice1"
                placeholder="Answer"
                size="large"
                error={
                  errors.choice1 !== undefined
                    ? { content: errors.choice1.message, pointing: "below" }
                    : false
                }
              >
                <input {...register("choice1", {})} />
              </Form.Input>
              <Form.Input
                label={<label style={{ display: "none" }}>choice2</label>}
                id="choice2"
                placeholder="Answer"
                size="large"
                error={
                  errors.choice2 !== undefined
                    ? { content: errors.choice2.message, pointing: "below" }
                    : false
                }
              >
                <input {...register("choice2", {})} />
              </Form.Input>
              <Form.Input
                label={<label style={{ display: "none" }}>choice3</label>}
                id="choice3"
                placeholder="Answer"
                size="large"
                error={
                  errors.choice3 !== undefined
                    ? { content: errors.choice3.message, pointing: "below" }
                    : false
                }
              >
                <input {...register("choice3", {})} />
              </Form.Input>
            </div>
          </div>
        </div>
        {errors.server && (
          <div className="row">
            <div className="two wide column"></div>
            <div className="twelve wide column">
              <Message
                error
                role="alert"
                header={errors.server.message}
              />
            </div>
          </div>
        )}
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
export default connect(mapStateToProps, null)(WordModal);
