import { Table, Pagination, Button, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchLessons } from "../actions";

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
        color="black"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              className="table row"
              width={4}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              className="table row"
              width={12}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              className="table row"
              width={5}
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
                    <p>{lesson.title}</p>
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
      <Pagination
        activePage={activePage}
        pointing
        secondary
        totalPages={Math.floor(lessons.totalLessons / 10) + 1 || 1}
        onPageChange={paginationHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { lessons: state.lessons, totalLessons: state.totalLessons };
};
export default connect(mapStateToProps, null)(LessonsTable);
