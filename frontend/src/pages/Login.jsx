import LoginForm from "../components/Forms/LoginForm";
import ErrorModal from "../components/Modals/ErrorModal";
import { useState } from "react";
const Login = () => {
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ header: "", description: "" });
  const options = { modal, setModal, modalMsg, setModalMsg };
  return (
    <div className="Login Outlet ui middle aligned center aligned grid">
      <div className="column four wide">
        <LoginForm {...options} />
        <ErrorModal {...options} />
      </div>
    </div>
  );
};
export default Login;
