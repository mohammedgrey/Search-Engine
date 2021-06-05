import React from "react";

import "./Suggestions.scss";
const Suggestions = ({ suggestions }) => {
  return (
    <div className="suggestions-list">
      {suggestions.map((suggestion) => {
        return (
          <div className="suggestion-item">
            <p>{suggestion.sentence}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
