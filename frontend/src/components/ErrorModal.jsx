import { Modal, Button } from "semantic-ui-react";
const ErrorModal = ({ modal, modalMsg, setModal }) => {
  return (
    <Modal
      centered={true}
      open={modal}
      onClose={() => setModal(false)}
    >
      <Modal.Header>{modalMsg.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{modalMsg.description}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          onClick={() => setModal(false)}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
};
export default ErrorModal;
