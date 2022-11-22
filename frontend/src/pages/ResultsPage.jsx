import { Header, Table, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchResult } from "../actions";
import { isEmpty } from "../utils";

const ResultsPage = ({ result }) => {
  let { lessonId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchResult(lessonId));
  }, []);
  return (
    <div className="ResultsPage Outlet">
      <div className="ui centered grid">
        <div className="row">
          <div className="four wide column">
            <Header
              as="h1"
              className="ui left floated"
            >
              {result.quiz.id ? `${result.quiz["Lesson.title"]}` : "Title"}
            </Header>
          </div>
          <div className="four wide column ">
            <Header
              as="h1"
              className="ui right floated"
            >
              {result.quiz.id
                ? `Result: ${result.quiz.score} of ${result.quiz_items.length}`
                : "Result: xx of xx"}
            </Header>
          </div>
        </div>
        <div className="row">
          <div className="ten wide column">
            <Table
              fixed
              celled
              textAlign="center"
              color="blue"
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Word</Table.HeaderCell>
                  <Table.HeaderCell>Answer</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {result.quiz.id &&
                  result.quiz_items.map((result) => {
                    return (
                      <Table.Row key={result["word_id"]}>
                        <Table.Cell>
                          {result["isCorrect"] ? (
                            <Icon
                              color="green"
                              name="checkmark"
                              size="large"
                            />
                          ) : (
                            <Icon
                              color="red"
                              name="close"
                              size="large"
                            />
                          )}
                        </Table.Cell>
                        <Table.Cell>{result["Word.jp_word"]}</Table.Cell>
                        <Table.Cell>{result["Word.Choices.answer"]}</Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { result: state.result };
};
export default connect(mapStateToProps, null)(ResultsPage);
