import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Card, Header, Image, Input, Pagination } from "semantic-ui-react";
import { viewUsersRows } from "../utils/constant";
import { totalPages } from "../utils";
import { fetchUserSearch } from "../actions";
const UserSearchPage = ({ userList, total }) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const paginationHandler = (e, { activePage }) => {
    e.preventDefault();
    setActivePage(activePage);
    dispatch(fetchUserSearch(debouncedTerm, activePage - 1));
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (debouncedTerm) {
      dispatch(fetchUserSearch(debouncedTerm, activePage - 1));
    }
  }, [debouncedTerm]);

  //new
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchText);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  return (
    <div className="UserSearchPage">
      <div className="ui centered grid">
        <div className="row">
          <Header as="h1">Search Users</Header>
        </div>
        <div className="row">
          <div className="five wide column">
            <Input
              fluid
              placeholder="Enter Username Here"
              value={searchText}
              onChange={searchHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="ten wide column">
            <Card.Group itemsPerRow={2}>
              {userList &&
                userList.map((user) => {
                  return (
                    <Card
                      key={user.id}
                      className="user"
                      as={Link}
                      to={`../users/${user.id}`}
                      relative="path"
                    >
                      <Card.Content>
                        <Image
                          floated="left"
                          size="tiny"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        />
                        <Card.Header>{user.username}</Card.Header>
                      </Card.Content>
                    </Card>
                  );
                })}
            </Card.Group>
          </div>
        </div>
        <div className="row">
          <Pagination
            activePage={activePage}
            pointing
            secondary
            totalPages={totalPages(total, viewUsersRows)}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userList: state.userList.users, total: state.userList.total };
};
export default connect(mapStateToProps, null)(UserSearchPage);
