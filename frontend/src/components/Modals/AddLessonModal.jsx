import { Modal, Button, Form, Message } from "semantic-ui-react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import server from "../../api/server";
import { validateLessonModal } from "../../utils";
import { fetchLessonsAdmin } from "../../actions";
const AddLessonModal = ({ modal, setModal, offset }) => {
  const initialFormState = {
    title: "",
    description: "",
    server: "",
  };
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialFormState);
  const onSubmit = async (e) => {
    e.preventDefault();
    let sample = validateLessonModal(title, description);
    setErrors(sample);
    if (Object.values(sample).every((value) => value === "")) {
      apiCall();
    }
  };
  const apiCall = () => {
    setIsLoading(true);
    server
      .post("/api/admin/addLesson", {
        title,
        description,
      })
      .then((response) => {
        setIsLoading(false);
        cancelModal();
        dispatch(fetchLessonsAdmin(offset));
      })
      .catch((error) => {
        setIsLoading(false);
        let sample = validateLessonModal(title, description);
        let msg = error.response
          ? error.response.data.message
          : "Server is down. Please try again later.";
        setErrors({ ...sample, server: msg });
      });
  };

  const cancelModal = () => {
    setModal(false);
    setTitle("");
    setDescription("");
    setIsLoading(false);
    setErrors(initialFormState);
  };

  const handleTitle = (e) => {
    e.preventDefault(e);
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return (
    <Modal
      as={Form}
      centered={true}
      open={modal}
      onClose={() => cancelModal()}
      size="small"
      onSubmit={(e) => onSubmit(e)}
      error
    >
      <Modal.Header>Add Lesson</Modal.Header>
      <Modal.Content>
        <div className="ui grid">
          <div className="two wide column"></div>
          <div className="twelve wide column">
            <Form.Input
              size="large"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => handleTitle(e)}
              error={
                errors.title
                  ? { content: errors.title, pointing: "left" }
                  : false
              }
            />
            <Form.TextArea
              size="large"
              placeholder="Description"
              value={description}
              onChange={(e) => handleDescription(e)}
              error={
                errors.description
                  ? { content: errors.description, pointing: "left" }
                  : false
              }
            />
          </div>
          {errors.server && (
            <div className="row ui container centered">
              <Message>{errors.server}</Message>
            </div>
          )}
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
  return { offset: state.lessons.offset };
};
export default connect(mapStateToProps, null)(AddLessonModal);
