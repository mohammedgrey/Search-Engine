import React, { useState, useEffect } from "react";
import getParameterByName from "../helpers/getParameterByName";
import "./Results.scss";
import SearchResult from "./SearchResult";
import useSpeechToText from "react-hook-speech-to-text";
import { useHistory } from "react-router-dom";
import { getSuggestions } from "../API/suggestions";
import {
  addToSearchHistory,
  getSearchHistory,
} from "../helpers/userSearchHistory";
import tempInitialStateResults from "../helpers/tempInitialStateResults";
import {
  retrieveLastSearchedQuery,
  retrieveSearchResults,
  saveSearchState,
} from "../helpers/resultsStateManagement";
import { getSearchResults } from "../API/search";
import LoadingGIF from "./LoadingGIF";

const Results = () => {
  let history = useHistory();
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [queryString, setQueryString] = useState("");
  // const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [dispResults, setDispResults] = useState([]);

  const getTheRightPagesToShow = () => {
    const totalPagesNum = Math.ceil(
      results.length / +process.env.REACT_APP_RESULTS_PER_PAGE
    );
    const myset = [];

    let i = currentPage - 1;
    let j = currentPage + 1;

    const boundaryLeft =
      currentPage -
      3 -
      (currentPage + 3 > totalPagesNum && 3 - (totalPagesNum - currentPage));
    const boundaryRight =
      currentPage + 3 - (currentPage - 3 <= 0 && currentPage - 3 - 1);

    while (i > 0 && i >= boundaryLeft) myset.push(i--);
    myset.push(currentPage);
    while (j <= totalPagesNum && j <= boundaryRight) myset.push(j++);

    setPages(
      [...myset].sort(function (a, b) {
        return a - b;
      })
    );
  };

  //speech recognition
  const {
    error,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    interimResult,
  } = useSpeechToText({
    continuous: false,
    crossBrowser: true,
    timeout: 10000,
    speechRecognitionProperties: { interimResults: true },
  });

  //update the query string from the URL every time the page loads
  useEffect(() => {
    // console.log("[] query:" + queryString);
    const theCurrentQueryString = getParameterByName("q");
    const theCurrentPageNumber = +getParameterByName("page");
    setQueryString(theCurrentQueryString);
    setCurrentPage(theCurrentPageNumber);
    if (retrieveLastSearchedQuery() !== theCurrentQueryString) {
      //case 1) Make a new request as the input changed
      console.log("Make a new request");
      setLoadingResults(true);
      getSearchResults(theCurrentQueryString)
        .then((resultsFromSearch) => {
          console.log(resultsFromSearch);
          saveSearchState(theCurrentQueryString, resultsFromSearch);
          setResults(resultsFromSearch);
        })
        .catch(console.log)
        .finally(() => {
          setLoadingResults(false);
        });
    } else {
      //case 2) The results are already stored, just cash them
      console.log("Cash already saved results");
      setResults(retrieveSearchResults());
    }

    console.log(+getParameterByName("page"));
  }, [history.location]);

  useEffect(() => {
    getTheRightPagesToShow();
    const lastResult = currentPage * +process.env.REACT_APP_RESULTS_PER_PAGE;
    const firstResult = lastResult - +process.env.REACT_APP_RESULTS_PER_PAGE;
    setDispResults(results.slice(firstResult, lastResult));
  }, [currentPage, results]);

  //To get the history of all users as suggestions
  const handleInputChange = async (e) => {
    e.preventDefault();
    // setSearchInput(e.target.value);
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

  //when clicking on the search button
  const search = (e) => {
    e.preventDefault();
    if (queryString !== "") {
      history.push(`/Results?q=${encodeURIComponent(queryString)}&page=1`);
    }
  };

  //when pressing enter
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      if (queryString !== "")
        history.push(`/Results?q=${encodeURIComponent(queryString)}&page=${1}`);
    }
  };

  //Manage Page Changes
  const goToPage = (e) => {
    history.push(
      `/Results?q=${encodeURIComponent(queryString)}&page=${+e.target.id}`
    );
  };
  const goToThisPage = (pageNumber) => {
    history.push(
      `/Results?q=${encodeURIComponent(queryString)}&page=${pageNumber}`
    );
  };

  //Disable prev and next if on the first or last page
  const showGoToFirstAndPrev = currentPage !== 1;
  const showGotToLastAndNext =
    currentPage < results.length / +process.env.REACT_APP_RESULTS_PER_PAGE;

  //compute the last page
  const lastPageNumber = Math.ceil(
    results.length / +process.env.REACT_APP_RESULTS_PER_PAGE
  );

  const goToHome = () => {
    history.push(`/`);
  };

  return (
    <div className="results-body">
      <div className="result-header navbar fixed-top">
        <span className="logo" onClick={goToHome}>
          <img
            src="https://cdn.discordapp.com/attachments/690679446952345701/850318347543379988/Logo.png"
            width="150px"
            height="35px"
          ></img>
          {/* LOOK ME UP */}
        </span>
        <div className="search-section-res search-bar">
          <div className="d-flex align-items-center justify-content-left">
            <button
              id="voice2"
              className={"fas fa-microphone-alt " + (isRecording ? "glow" : "")}
              onClick={isRecording ? stopSpeechToText : startSpeechToText}
            ></button>
            <input
              id="input"
              type="text"
              className="form-control"
              placeholder="Watcha lookin' for?"
              onKeyDown={searchEnter}
              onChange={handleInputChange}
              autoComplete="off"
              defaultValue={queryString || interimResult}
            ></input>
            <button
              className="fas fa-search search-button-2"
              onClick={search}
            ></button>
          </div>
        </div>
        {/*<span className="fas fa-bars menu-icon"></span>*/}
      </div>
      {!loadingResults ? (
        <div>
          <div className="result-block">
            {dispResults.map((result, index) => (
              <SearchResult
                className="search-result"
                siteName={result.website}
                pageTitle={result.title}
                URL={result.url}
                preview={result.snippet}
                key={index}
              ></SearchResult>
            ))}
          </div>

          <div className="result-footer justify-content-center fixed-bottom">
            <div id="pages">
              <button
                disabled={!showGoToFirstAndPrev}
                className={`first page fas fa-angle-double-left ${
                  !showGoToFirstAndPrev ? "disabled-button" : ""
                }`}
                onClick={() => goToThisPage(1)}
              ></button>
              <button
                disabled={!showGoToFirstAndPrev}
                className={`previous page fas fas fa-angle-left ${
                  !showGoToFirstAndPrev ? "disabled-button" : ""
                }`}
                onClick={() => goToThisPage(currentPage - 1)}
              ></button>
              {pages.map((n) => (
                <button
                  key={n}
                  id={n}
                  onClick={goToPage}
                  className={`page overflow-pages ${
                    n === currentPage ? "page-color" : ""
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={!showGotToLastAndNext}
                className={`next page fas fa-angle-right ${
                  !showGotToLastAndNext ? "disabled-button" : ""
                }`}
                onClick={() => goToThisPage(currentPage + 1)}
              ></button>
              <button
                disabled={!showGotToLastAndNext}
                className={`last page fas fa-angle-double-right ${
                  !showGotToLastAndNext ? "disabled-button" : ""
                }`}
                onClick={() => goToThisPage(lastPageNumber)}
              ></button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingGIF />
      )}
    </div>
  );
};

export default Results;
