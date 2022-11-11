import { Table, Pagination, Button, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWords } from "../actions";
import { totalPages } from "../utils";
import { viewWordsRows } from "../utils/constant";
const WordsTable = ({ words }) => {
  let { lesson_id } = useParams();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchWords(activePage - 1, lesson_id));
  };

  useEffect(() => {
    dispatch(fetchWords(activePage - 1, lesson_id));
  }, []);

  return (
    <div>
      <Table
        fixed
        celled
        color="black"
        striped
        className="WordsTable"
      >
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell width={2}>Word</Table.HeaderCell>
            <Table.HeaderCell width={2}>Answer</Table.HeaderCell>
            <Table.HeaderCell
              colSpan={3}
              width={6}
            >
              Extra Choices
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {words.data &&
            words.data.map((word) => {
              return (
                <Table.Row
                  key={word.id}
                  textAlign="center"
                >
                  <Table.Cell width={2}>
                    <span>
                      <h1 className="ui header">{word.jp_word}</h1>
                    </span>
                  </Table.Cell>
                  {[...Array(4).keys()].map((index) => {
                    return (
                      <Table.Cell
                        width={2}
                        key={`${word.id} ${index}`}
                      >
                        <span>{word.Choices[index].word}</span>
                      </Table.Cell>
                    );
                  })}
                  <Table.Cell
                    width={2}
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
          totalPages={totalPages(words.totalWords, viewWordsRows)}
          onPageChange={paginationHandler}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { words: state.words };
};
export default connect(mapStateToProps, null)(WordsTable);
