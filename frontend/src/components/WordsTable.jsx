import { Table, Pagination, Button, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWords } from "../actions";

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
      {console.log(words)}
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
                  <Table.Cell width={2}>
                    <span>{word.Choices[0].word}</span>
                  </Table.Cell>
                  <Table.Cell width={2}>
                    <span>{word.Choices[1].word}</span>
                  </Table.Cell>
                  <Table.Cell width={2}>
                    <span>{word.Choices[2].word}</span>
                  </Table.Cell>
                  <Table.Cell width={2}>
                    <span>{word.Choices[3].word}</span>
                  </Table.Cell>
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
          totalPages={Math.floor(words.totalWords / 10) + 1 || 1}
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
