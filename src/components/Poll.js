import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  ProgressBar,
  Card,
} from "react-bootstrap";
import "./Poll.css";

// Superhero options data
const options = [
  { id: 1, text: "Superman", image: process.env.PUBLIC_URL + "/img/s1.jpg" },
  { id: 2, text: "Flash", image: process.env.PUBLIC_URL + "/img/s2.jpg" },
  { id: 3, text: "Hulk", image: process.env.PUBLIC_URL + "/img/s3.jpg" },
  { id: 4, text: "Abomination", image: process.env.PUBLIC_URL + "/img/s4.jpg" },
  { id: 5, text: "Iron Man", image: process.env.PUBLIC_URL + "/img/s5.jpg" },
  {
    id: 6,
    text: "Captain America",
    image: process.env.PUBLIC_URL + "/img/s6.jpg",
  },
];

// Groups of superhero options to be compared
const groupsToCompare = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// React functional component for the superhero poll
const Poll = () => {
  // State variables
  const [selectedOptions, setSelectedOptions] = useState({}); // Tracks selected superhero options for each group
  const [votes, setVotes] = useState({}); // Stores the number of votes for each superhero option
  const [submitted, setSubmitted] = useState(false); // Indicates whether the user has submitted their votes

  // Event handler for selecting a superhero option
  const handleOptionSelect = (groupId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [groupId]: optionId,
    }));
  };

  // Event handler for submitting votes
  const handleVoteSubmit = () => {
    const selectedOptionIds = Object.values(selectedOptions);
    if (selectedOptionIds.every((id) => id !== undefined)) {
      selectedOptionIds.forEach((optionId) => {
        setVotes((prevVotes) => ({
          ...prevVotes,
          [optionId]: (prevVotes[optionId] || 0) + 1,
        }));
      });
      setSubmitted(true); // Marks that the user has submitted their votes
    }
  };

  // Event handler for voting again
  const handleVoteAgain = () => {
    setSelectedOptions({}); // Resets selected options
    setSubmitted(false); // Resets the submitted state to allow the user to vote again
  };

  // Function to calculate the percentage of votes for each option in a group
  const calculateGroupPercentage = (group) => {
    const groupVotes = group.map((optionId) => votes[optionId] || 0); // Retrieve votes for each option in the group
    const totalVotes = groupVotes.reduce((acc, count) => acc + count, 0); // Calculate the total votes in the group
    return groupVotes.map((count) => (count / totalVotes) * 100 || 0); // Calculate the percentage of votes for each option
  };

  // JSX for rendering the component
  // Poll.js-
  return (
    <Container className="d-flex justify-content-center align-items-center">
      {!submitted ? (
        // Display when votes are not submitted
        <div>
          <h1 className="text-center pt-2">SUPERHERO POLL SURVEY</h1>
          {groupsToCompare.map((group, index) => (
            <div key={index}>
              <p className="poll-question">
                {index === 0
                  ? "WHO IS THE FASTEST? "
                  : index === 1
                  ? "WHO IS THE STRONGEST"
                  : index === 2
                  ? "WHO IS WISER ?"
                  : "Out of range"}
              </p>

              <Row className="options-grid g-3">
                {group.map((optionId) => (
                  <Col key={optionId} className="option">
                    <Card className="card-container">
                      <Card.Text className="card-text">
                        {options.find((opt) => opt.id === optionId).text}
                      </Card.Text>

                      <Card.Img
                        variant="top"
                        src={options.find((opt) => opt.id === optionId).image}
                        alt={`Option ${optionId}`}
                        className="card-image"
                      />

                      <Card.Body className="card-body">
                        <Button
                          variant="primary"
                          className={`like-button ${
                            selectedOptions[index] === optionId
                              ? "like-button-liked"
                              : ""
                          }`}
                          onClick={() => handleOptionSelect(index, optionId)}
                        >
                          {selectedOptions[index] === optionId
                            ? "👍 Liked!"
                            : "👍 Like"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          <Button
            disabled={
              !Object.values(selectedOptions).every((id) => id !== undefined)
            }
            onClick={handleVoteSubmit}
            className="mt-5 d-block mx-auto mb-4"
            variant="success"
          >
            Submit Vote
          </Button>
        </div>
      ) : (
        // Display when votes are submitted
        <div>
          <h2 className="text-center">Results:</h2>
          {groupsToCompare.map((group, index) => (
            <div key={index}>
              <p className="poll-question">
                {index === 0
                  ? "WHO IS THE FASTEST? "
                  : index === 1
                  ? "WHO IS THE STRONGEST"
                  : index === 2
                  ? "WHO IS WISER ?"
                  : "Out of range"}
              </p>
              <Row className="results-grid g-3">
                {group.map((optionId) => (
                  <Col key={optionId} className="result">
                    <Card className="card-container">
                      <Card.Text className="card-text">
                        {options.find((opt) => opt.id === optionId).text}
                      </Card.Text>

                      <Card.Img
                        variant="top"
                        src={options.find((opt) => opt.id === optionId).image}
                        className="card-image"
                      />

                      <Card.Body className="card-body">
                        <p>
                          {options.find((opt) => opt.id === optionId).text}:{" "}
                          {votes[optionId] || 0} votes
                        </p>
                        <ProgressBar
                          now={
                            calculateGroupPercentage(group)[
                              group.indexOf(optionId)
                            ]
                          }
                          label={`${calculateGroupPercentage(group)[
                            group.indexOf(optionId)
                          ].toFixed(2)}%`}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          <Button
            onClick={handleVoteAgain}
            variant="warning"
            className="mt-5 d-block mx-auto"
          >
            Vote Again
          </Button>
        </div>
      )}
    </Container>
  );
};
export default Poll;
