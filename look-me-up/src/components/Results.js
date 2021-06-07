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
import Suggestions from "./Suggestions";
import useOuterClick from "../helpers/useOuterClick";

const Results = () => {
  let history = useHistory();
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalResultsFound, setTotalResultsFound] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const goToHome = () => {
    history.push(`/`);
  };

  //---------------------speech recognition---------------------//
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

  //update the search input value when voice recording is used
  useEffect(() => {
    console.log(interimResult);
    if (isRecording && interimResult) {
      document.getElementById("input").value = interimResult;
      setQueryString(interimResult);
    }
  }, [interimResult]);

  //if the search input changed due to voice, automatically search
  useEffect(() => {
    console.log(interimResult);
    if (!isRecording && queryString != "") {
      search();
    }
  }, [isRecording]);

  //--------------------State Management------------------//

  //update the query string from the URL every time the page loads
  useEffect(() => {
    const theCurrentQueryString = getParameterByName("q");
    const theCurrentPageNumber = +getParameterByName("page");
    setQueryString(theCurrentQueryString);
    setCurrentPage(theCurrentPageNumber);
    setSearchFocused(false);
    setLoadingResults(true);
    getSearchResults({
      q: theCurrentQueryString,
      page: theCurrentPageNumber,
      limit: +process.env.REACT_APP_RESULTS_PER_PAGE,
    })
      .then((resultsFromSearch) => {
        console.log(resultsFromSearch);
        // saveSearchState(theCurrentQueryString, resultsFromSearch);
        setResults(resultsFromSearch.results);
        setTotalResultsFound(resultsFromSearch.totalResultsFound);
      })
      .catch(console.log)
      .finally(() => {
        setLoadingResults(false);
      });
  }, [history.location]);

  //To get the history of all users as suggestions
  const handleInputChange = async (e) => {
    e.preventDefault();
    // setSearchInput(e.target.value);
    setQueryString(e.target.value);
  };

  useEffect(async () => {
    if (queryString.trim() !== "") {
      setLoadingSuggestions(true);
      try {
        setSuggestions(await getSuggestions(queryString));
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingSuggestions(false);
      }
    } else {
      setSuggestions(getSearchHistory());
    }
  }, [queryString]);
  const insideSuggestions = useOuterClick((ev) => {
    setSearchFocused(false);
  });

  //---------------------Pagination---------------------//

  const getTheRightPagesToShow = () => {
    const totalPagesNum = Math.ceil(
      totalResultsFound / +process.env.REACT_APP_RESULTS_PER_PAGE
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

  //Manage Page Changes
  const goToPage = (e) => {
    history.push(
      `/Results?q=${encodeURIComponent(queryString)}&page=${+e.target
        .id}&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`
    );
  };
  const goToThisPage = (pageNumber) => {
    history.push(
      `/Results?q=${encodeURIComponent(
        queryString
      )}&page=${pageNumber}&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`
    );
  };

  //Disable prev and next if on the first or last page
  const showGoToFirstAndPrev = currentPage !== 1;
  const showGotToLastAndNext =
    currentPage < totalResultsFound / +process.env.REACT_APP_RESULTS_PER_PAGE;

  //compute the last page
  const lastPageNumber = Math.ceil(
    totalResultsFound / +process.env.REACT_APP_RESULTS_PER_PAGE
  );

  //pagination
  useEffect(() => {
    console.log(results);
    getTheRightPagesToShow();
  }, [totalResultsFound, currentPage]);

  //---------------------Searching---------------------//

  //when clicking on the search button
  const search = () => {
    //e.preventDefault();
    if (queryString !== "") {
      addToSearchHistory(queryString);
      history.push(
        `/Results?q=${encodeURIComponent(queryString)}&page=1&limit=${+process
          .env.REACT_APP_RESULTS_PER_PAGE}`
      );
    }
  };

  //when pressing enter
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      addToSearchHistory(queryString);
      if (queryString !== "")
        history.push(
          `/Results?q=${encodeURIComponent(
            queryString
          )}&page=${1}&limit=${+process.env.REACT_APP_RESULTS_PER_PAGE}`
        );
    }
  };

  var noResults = totalResultsFound === 0;
  return (
    <div className="results-body">
      <div className="result-header navbar fixed-top">
        <span className="logo" onClick={goToHome}>
          <img
            src="https://cdn.discordapp.com/attachments/690679446952345701/850318347543379988/Logo.png"
            width="150px"
            height="50px"
          ></img>
          {/* LOOK ME UP */}
        </span>
        <div className="search-section-res search-bar">
          <div className="d-flex align-items-center justify-content-left">
            <div
              ref={insideSuggestions}
              style={{ position: "relative", width: "50%", marginTop: "3px" }}
              className="d-flex align-items-center justify-content-left"
            >
              <button
                id="voice2"
                className={
                  "fas fa-microphone-alt " + (isRecording ? "glow" : "")
                }
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
                style={{ width: "100%" }}
                onFocus={() => setSearchFocused(true)}
                value={queryString}
              ></input>
              <button
                className="fas fa-search search-button-2"
                onClick={search}
              ></button>
              {searchFocused &&
                !loadingSuggestions &&
                suggestions?.length !== 0 && (
                  <Suggestions
                    suggestions={suggestions}
                    color="#1f2940"
                    styles="suggestion-item-res"
                    marg="-10px"
                    width="92%"
                  />
                )}
            </div>
          </div>
        </div>
        {/*<span className="fas fa-bars menu-icon"></span>*/}
      </div>
      {!loadingResults ? (
        <div>
          {noResults ? (
            <div className="center-me" style={{ textAlign: "center" }}>
              <h1 id="no-results" className="container ">
                No results found. Try searching for something else.
              </h1>
            </div>
          ) : (
            <div className="result-block">
              {results.map((result, index) => (
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
          )}

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
