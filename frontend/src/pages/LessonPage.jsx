import { useState } from "react";
import { Button } from "semantic-ui-react";
import LessonsTable from "../components/LessonsTable";
import AddLessonModal from "../components/Modals/AddLessonModal";
import WordsTable from "../components/WordsTable";
import { Link } from "react-router-dom";
const LessonPage = (props) => {
  const [modal, setModal] = useState(false);

  return (
    <div className="LessonPage">
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
              //TODO   onClick={() => setModal(true)}
            >
              Add New Word
            </Button>
            <WordsTable />
          </div>
        </div>
      </div>
      {/*TODO <AddLessonModal
        modal={modal}
        setModal={setModal}
      /> */}
    </div>
  );
};

export default LessonPage;
