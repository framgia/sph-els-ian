import { useState } from "react";
import ErrorModal from "../components/Modals/ErrorModal";
import RegistrationForm from "../components/Forms/RegistrationForm";

const Register = () => {
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ header: "", description: "" });
  return (
    <div className="Register ui middle aligned center aligned grid">
      <div className="column four wide">
        <h2>Registration</h2>
        <RegistrationForm
          modal={modal}
          setModal={setModal}
          modalMsg={modalMsg}
          setModalMsg={setModalMsg}
        />
        <ErrorModal
          modal={modal}
          setModal={setModal}
          modalMsg={modalMsg}
        />
      </div>
    </div>
  );
};
export default Register;
