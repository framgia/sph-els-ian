import LoginForm from "../components/Forms/LoginForm";
import ErrorModal from "../components/ErrorModal";
import { useState } from "react";
const Login = () => {
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ header: "", description: "" });
  return (
    <div className="Login ui middle aligned center aligned grid">
      <div className="column four wide">
        <h2 className="">Login</h2>
        <LoginForm
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
export default Login;
