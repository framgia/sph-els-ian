import { Table, Pagination, Button, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLessons } from "../actions";
import { totalPages } from "../utils";
import { viewLessonsRows } from "../utils/constant";
const LessonsTable = ({ lessons }) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchLessons(activePage - 1));
  };

  useEffect(() => {
    dispatch(fetchLessons(activePage - 1));
  }, []);

  return (
    <div>
      <Table
        fixed
        celled
        structured
        color="black"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              className="table row"
              width={3}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              className="table row"
              width={7}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              className="table row"
              width={2}
            >
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {lessons.data &&
            lessons.data.map((lesson) => {
              return (
                <Table.Row key={lesson.id}>
                  <Table.Cell className="table row">
                    <Link to={`${lesson.id}`}>
                      <span>{lesson.title}</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="table row">
                    <span>{lesson.description}</span>
                  </Table.Cell>
                  <Table.Cell
                    className="table row"
                    textAlign="right"
                  >
                    <Button className="negative">
                      <div className="ui center aligned">
                        <Icon className="trash" />
                      </div>
                    </Button>
                    <Button className="">
                      <div className="ui center aligned">
                        <Icon className="wrench" />
                      </div>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <div className="ui center aligned grid">
        <Pagination
          activePage={activePage}
          pointing
          secondary
          totalPages={totalPages(lessons.totalLessons, viewLessonsRows)}
          onPageChange={paginationHandler}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { lessons: state.lessons, totalLessons: state.totalLessons };
};
export default connect(mapStateToProps, null)(LessonsTable);
