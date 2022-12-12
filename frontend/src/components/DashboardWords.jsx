import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Pagination, Table } from "semantic-ui-react";
import { fetchDashboardWords } from "../actions";
import { viewWordsRows } from "../utils/constant";
import { totalPages } from "../utils";

const DashboardWords = ({ words, totalWords }) => {
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchDashboardWords(activePage - 1));
  };
  useEffect(() => {
    dispatch(fetchDashboardWords(activePage - 1));
  }, []);
  return (
    <div className="DashboardWords">
      <Table
        size="large"
        columns={2}
        textAlign="center"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Words</Table.HeaderCell>
            <Table.HeaderCell>Answers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {words.length !== 0 &&
            words.map((word) => {
              return (
                <Table.Row key={word.word}>
                  <Table.Cell>{word.jp_word}</Table.Cell>
                  <Table.Cell>{word.word}</Table.Cell>
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
          totalPages={totalPages(totalWords, viewWordsRows)}
          onPageChange={paginationHandler}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    words: state.dashboard.words,
    totalWords: state.dashboard.totalWords,
  };
};
export default connect(mapStateToProps, null)(DashboardWords);
