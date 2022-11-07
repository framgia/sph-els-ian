import { Modal, Button } from "semantic-ui-react";
const ErrorModal = (props) => {
  return (
    <Modal
      centered={true}
      open={props.modal}
      onClose={() => props.setModal(false)}
    >
      <Modal.Header>{props.modalMsg.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{props.modalMsg.description}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          onClick={() => props.setModal(false)}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
};
export default ErrorModal;
