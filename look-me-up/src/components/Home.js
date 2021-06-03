import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import { getSuggestions } from "../API/suggestions";
import { addToSearchHistory, getSearchHistory } from "../helpers/userSearchHistory";

const Home = () => {
  var recording = false;
  let history = useHistory();
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [queryString, setQueryString] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  //when clicking on the search button
  const search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("home-input").value;
    if (searchInput !== "") {
      addToSearchHistory(queryString);
      history.push(`/Home/Results?q=${encodeURIComponent(queryString)}`);
    }
  };

  //when pressing enter
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      var searchInput = document.getElementById("home-input").value;
      if (searchInput !== "") {
        addToSearchHistory(queryString);
        history.push(`/Home/Results?q=${encodeURIComponent(queryString)}`);
      }
    }
  };

  //start voice recognition
  const voiceRecord = (e) => {
    e.preventDefault();
    if (recording === false) {
      recording = true;
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      document.getElementById("home-input").value = transcript;
      //document.getElementById("voice").classList.add("glow");
    } else {
      recording = false;
      SpeechRecognition.stopListening();
      //document.getElementById("voice").classList.remove("glow");
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
          <button id="voice" className="fas fa-microphone-alt" onClick={voiceRecord}></button>
          <input
            id="home-input"
            type="text"
            className="form-control"
            placeholder="Watcha lookin' for?"
            onKeyDown={searchEnter}
            onChange={handleQueryChange}
            value={queryString}
            autoComplete="off"
          ></input>
          <button className="fas fa-search search-button" onClick={search}></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
