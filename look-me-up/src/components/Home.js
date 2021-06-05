//Speech recognition code from https://github.com/Riley-Brown/react-speech-to-text
import React, { useState, useEffect, useRef } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import { getSuggestions } from "../API/suggestions";
import { addToSearchHistory, getSearchHistory } from "../helpers/userSearchHistory";
import Suggestions from "./Suggestions";
import useOuterClick from "../helpers/useOuterClick";

const Home = () => {
  let history = useHistory();
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  //speech recognition
  const { error, isRecording, results, startSpeechToText, stopSpeechToText, interimResult } = useSpeechToText({
    continuous: false,
    crossBrowser: true,
    timeout: 10000,
    speechRecognitionProperties: { interimResults: true },
  });

  //when clicking on the search button
  const search = (e) => {
    e.preventDefault();
    if (searchInput !== "") {
      addToSearchHistory(searchInput);
      history.push(`/Results?q=${encodeURIComponent(searchInput)}&page=1&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`);
    }
  };

  //when pressing enter in the search field
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      if (searchInput !== "") {
        addToSearchHistory(searchInput);
        history.push(`/Results?q=${encodeURIComponent(searchInput)}&page=1&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`);
      }
    }
  };

  //To get the history of all users as suggestions
  const handleInputChange = async (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setLoadingSuggestions(true);
      try {
        setSuggestions(await getSuggestions(e.target.value));
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingSuggestions(false);
      }
    } else {
      setSuggestions(getSearchHistory());
    }
  };
  const insideSuggestions = useOuterClick((ev) => {
    setSearchFocused(false);
  });

  var inputNotEmpty = searchInput !== "";
  return (
    <div className="home-body">
      <div className="search-section">
        <img src="https://cdn.discordapp.com/attachments/690679446952345701/850318347543379988/Logo.png" width="662px" height="280px"></img>
        {/* <h1> LOOK ME UP </h1> */}
        {/* <h6> I got everything you need </h6> */}

        <div ref={insideSuggestions} className="d-flex align-items-center justify-content-center" style={{ position: "relative" }}>
          <button id="voice" className={"fas fa-microphone-alt " + (isRecording ? "glow" : "")} onClick={isRecording ? stopSpeechToText : startSpeechToText}></button>
          <input
            id="home-input"
            type="text"
            className="form-control"
            placeholder="Watcha lookin' for?"
            onKeyDown={searchEnter}
            onChange={handleInputChange}
            value={interimResult}
            autoComplete="off"
            onFocus={() => setSearchFocused(true)}
          ></input>
          <button className="fas fa-search search-button" onClick={search}></button>
          {searchFocused && !loadingSuggestions && suggestions?.length !== 0 && <Suggestions suggestions={suggestions} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
