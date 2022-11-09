import { connect } from "react-redux";
import LessonsTable from "../components/LessonsTable";
const LessonPage = (props) => {
  return (
    <div className="LessonPage">
      <div className="ui center aligned middle aligned grid">
        <div className="eight wide column">
          <LessonsTable />
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(LessonPage);
