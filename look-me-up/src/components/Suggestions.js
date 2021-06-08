import React from "react";
import { useHistory } from "react-router";
import "./Suggestions.scss";

const Suggestions = ({ suggestions, color }) => {
  const history = useHistory();
  //   const inResultsStyle = {
  //     left: "-100px",
  //   };
  return (
    <div className="suggestions-list">
      {suggestions.map((suggestion) => {
        return (
          <div
            key={suggestion._id}
            className="suggestion-item"
            style={{ backgroundColor: color }}
            onClick={() => {
              history.push(`/Results?q=${encodeURIComponent(suggestion._id)}&page=1&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`);
            }}
          >
            <p id="suggestion-p">{suggestion._id}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
