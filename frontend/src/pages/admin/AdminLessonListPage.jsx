import { useState } from "react";
import LessonsTable from "../../components/LessonsTable";
import { Button } from "semantic-ui-react";
import LessonModal from "../../components/Modals/LessonModal";
const initialFormData = {
  id: 0,
  title: "",
  description: "",
};
const AdminLessonListPage = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(initialFormData);
  return (
    <div className="LessonPage Outlet">
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
            <LessonsTable
              setModal={setModal}
              setModalData={setModalData}
            />
          </div>
        </div>
      </div>
      <LessonModal
        modal={modal}
        setModal={setModal}
        modalData={modalData}
        setModalData={setModalData}
        initialFormData={initialFormData}
      />
    </div>
  );
};

export default AdminLessonListPage;
