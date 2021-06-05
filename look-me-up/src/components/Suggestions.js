import React from "react";
import "./Suggestions.scss";

const Suggestions = ({ suggestions }) => {
  return (
    <div className="suggestions-list">
      {suggestions.map((suggestion) => {
        return (
          <div className="suggestion-item">
            <p id="suggestion-p">{suggestion._id}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
