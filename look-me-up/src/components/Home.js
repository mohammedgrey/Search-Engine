//Speech recognition code from https://github.com/Riley-Brown/react-speech-to-text
import React, { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import { getSuggestions } from "../API/suggestions";
import {
  addToSearchHistory,
  getSearchHistory,
} from "../helpers/userSearchHistory";

const Home = () => {
  let history = useHistory();
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [queryString, setQueryString] = useState("");

  //speech recognition
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    interimResult,
  } = useSpeechToText({
    continuous: false,
    crossBrowser: true,
    timeout: 10000,
    speechRecognitionProperties: { interimResults: true },
  });

  //when clicking on the search button
  const search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("home-input").value;
    if (searchInput !== "") {
      addToSearchHistory(queryString);
      history.push(`/Home/Results?q=${encodeURIComponent(queryString)}`);
    }
  };

  //when pressing enter in the search field
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      var searchInput = document.getElementById("home-input").value;
      if (searchInput !== "") {
        addToSearchHistory(queryString);
        history.push(`/Home/Results?q=${encodeURIComponent(queryString)}`);
      }
    }
  };

  //To get the history of all users as suggestions
  const handleQueryChange = async (e) => {
    e.preventDefault();
    setQueryString(e.target.value);
    setLoadingSuggestions(true);
    try {
      setSuggestions(await getSuggestions(e.target.value));
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="home-body">
      <div className="search-section">
        <h1> LOOK ME UP </h1>
        <h6> I got everything you need </h6>

        <div className="d-flex align-items-center justify-content-center">
          <button
            id="voice"
            className={"fas fa-microphone-alt " + (isRecording ? "glow" : "")}
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          ></button>
          <input
            id="home-input"
            type="text"
            className="form-control"
            placeholder="Watcha lookin' for?"
            onKeyDown={searchEnter}
            onChange={handleQueryChange}
            value={interimResult}
            autoComplete="off"
          ></input>
          <button
            className="fas fa-search search-button"
            onClick={search}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
