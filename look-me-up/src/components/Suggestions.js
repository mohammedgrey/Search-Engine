import React from "react";
import { useHistory } from "react-router";
import "./Suggestions.scss";

const Suggestions = ({ suggestions, color, styles, marg, width }) => {
  const history = useHistory();
  //   const inResultsStyle = {
  //     left: "-100px",
  //   };
  return (
    <div className="suggestions-list" style={{ marginTop: marg, width: width }}>
      {suggestions.map((suggestion) => {
        return (
          <div
            key={suggestion._id}
            className={styles}
            style={{ backgroundColor: color }}
            onClick={() => {
              history.push(`/Results?q=${encodeURIComponent(suggestion._id)}&page=1&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`);
            }}
          >
            <p id="suggestion-p">{suggestion._id} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
