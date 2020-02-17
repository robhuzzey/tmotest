import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Jumbotron,
  ListGroup,
  Badge
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [venues, setVenues] = useState({ allowed: [], excluded: [] });
  const [userNames, setUserNames] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    fetch("/usernames")
      .then(result => {
        return result.json();
      })
      .then(json => {
        setUserNames(json);
      });
  }, []);

  useEffect(() => {
    if (filteredUsers.length === 0) return;
    fetch(`/venues?filterBy[users]=${filteredUsers.join(",")}`)
      .then(result => {
        return result.json();
      })
      .then(json => {
        setVenues(json);
      });
  }, [filteredUsers]);

  return (
    <Container>
      <Jumbotron>
        <h1>Hello, I'm no designer...</h1>
        <p>
          This is a simple bootstrap markup to demonstrate the application. I
          hope you like it :)
        </p>
      </Jumbotron>
      <Row>
        <Col>
          {userNames && (
            <Typeahead
              id="searchForUsers"
              labelKey="name"
              multiple
              options={userNames}
              placeholder="Search for users"
              onChange={setFilteredUsers}
            />
          )}
        </Col>
        <Col>
          <Badge pill variant="success">
            Matches: {venues.allowed.length}
          </Badge>
          <ListGroup variant="flush">
            {venues.allowed.map(venue => {
              return (
                <ListGroup.Item>
                  <h5>{venue.name}</h5>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <Badge pill variant="danger">
            Exclusions: {venues.excluded.length}
          </Badge>
          <ListGroup variant="flush">
            {venues.excluded.map(venue => {
              return (
                <ListGroup.Item variant="danger">
                  <h5>{venue.name}</h5>
                  <p>Reasons: </p>
                  {venue.cantDrink.length > 0 && (
                    <dl>
                      <dt>Can't drink:</dt>
                      <dd>{venue.cantDrink.join(",")}</dd>
                    </dl>
                  )}
                  {venue.cantEat.length > 0 && (
                    <dl>
                      <dt>Can't Eat:</dt>
                      <dd>{venue.cantEat.join(",")}</dd>
                    </dl>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
