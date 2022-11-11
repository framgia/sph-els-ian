import { useState } from "react";
import LessonsTable from "../components/LessonsTable";
import { Button } from "semantic-ui-react";
import AddLessonModal from "../components/Modals/AddLessonModal";
const LessonListPage = (props) => {
  const [modal, setModal] = useState(false);
  return (
    <div className="LessonPage">
      <div className="ui grid">
        <div className="row">
          <div className="four wide column"></div>
          <div className="eight wide column">
            <Button
              color="green"
              style={{ marginBottom: 5 }}
              onClick={() => setModal(true)}
            >
              Add Lesson
            </Button>
            <LessonsTable />
          </div>
        </div>
      </div>
      <AddLessonModal
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
};

export default LessonListPage;
