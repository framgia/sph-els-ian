import { useState } from "react";
import { Button } from "semantic-ui-react";
import AddWordModal from "../../components/Modals/AddWordModal.jsx";
import WordsTable from "../../components/WordsTable";
import { Link } from "react-router-dom";
const AdminLessonPage = (props) => {
  const [modal, setModal] = useState(false);

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
            <WordsTable />
          </div>
        </div>
      </div>
      <AddWordModal
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
};

export default AdminLessonPage;
