import { useState } from "react";
import { Button } from "semantic-ui-react";
import WordModal from "../../components/Modals/WordModal.jsx";
import WordsTable from "../../components/WordsTable";
import { Link } from "react-router-dom";

const initialModalData = {
  id: 0,
  jp_word: "",
  choices: [
    { id: 0, word: "" },
    { id: 1, word: "" },
    { id: 2, word: "" },
    { id: 3, word: "" },
  ],
};

const AdminLessonPage = (props) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);

  return (
    <div className="LessonPage Outlet">
      <div className="ui grid">
        <div className="row">
          <div className="four wide column"></div>
          <div className="eight wide column">
            <Link
              to=".."
              relative="path"
            >
              <Button
                className="ui left floated"
                style={{ marginBottom: 5 }}
              >
                Back to Lessons
              </Button>
            </Link>
            <Button
              color="green"
              className="ui right floated"
              style={{ marginBottom: 5 }}
              onClick={() => setModal(true)}
            >
              Add New Word
            </Button>
            <WordsTable
              setModal={setModal}
              setModalData={setModalData}
            />
          </div>
        </div>
      </div>
      <WordModal
        modal={modal}
        setModal={setModal}
        modalData={modalData}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    </div>
  );
};

export default AdminLessonPage;
