import React, { Component, useState, useEffect, useLayoutEffect } from "react";
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

const Results = () => {
  let history = useHistory();
  const [results, setResults] = useState([
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Wikipedia",
      pageTitle: "State of Palestine",
      URL: "https://en.wikipedia.org",
      preview:
        "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Today's latest from Al Jazeera",
      pageTitle: "Palestine",
      URL: "https://www.aljazeera.com",
      preview:
        "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Britannica",
      pageTitle: "Palestine | History, People, & Religion",
      URL: "https://www.britannica.com",
      preview:
        "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "HISTORY",
      pageTitle: "Palestine - History, Religion & Conflicts",
      URL: "https://www.history.com",
      preview:
        " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
    {
      siteName: "Amnesty",
      pageTitle:
        "Everything you need to know about human rights in Israel and ...",
      URL: "https://www.amnesty.org",
      preview:
        "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
    },
  ]);

  const [queryString, setQueryString] = useState("");
  const [searchInput, setSearchInput] = useState("palestine");
  const [suggestions, setSuggestions] = useState(getSearchHistory());
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  //calculate the total number of pages
  const totalPagesNum = Math.ceil(results.length / resultsPerPage);
  const pages = [];
  for (var i = 1; i <= totalPagesNum; i++) pages.push(i);

  //Choose the portion of results to display
  const lastResult = currentPage * resultsPerPage;
  const firstResult = lastResult - resultsPerPage;
  const dispResults = results.slice(firstResult, lastResult);

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
  useLayoutEffect(() => {
    const page = getParameterByName("page");
    setCurrentPage(page);
    document.getElementById(currentPage).classList.add("page-color");
    //get the search query to send a request
    const qs = getParameterByName("q");
    setQueryString(qs);
  }, []);

  //Update URL if current page or query string changes
  useLayoutEffect(() => {
    document.getElementById(currentPage).classList.add("page-color");
    history.push(
      `/Home/Results?q=${encodeURIComponent(
        queryString
      )}&page=${currentPage}&limit=10`
    );
  }, [currentPage, queryString]);

  //go to home page on logo click
  const goToHome = (e) => {
    history.push("/");
  };

  //To get the history of all users as suggestions
  const handleInputChange = async (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
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
    var searchInput = document.getElementById("input").value;
    if (searchInput !== "") {
      document.getElementById(currentPage).classList.remove("page-color");
      document.getElementById("1").classList.add("page-color");
      setCurrentPage(1);
      setQueryString(searchInput);
    }
  };

  //when pressing enter
  const searchEnter = (e) => {
    if (e.keyCode === 13) {
      var searchInput = document.getElementById("input").value;
      if (searchInput !== "") {
        document.getElementById(currentPage).classList.remove("page-color");
        document.getElementById("1").classList.add("page-color");
        setCurrentPage(1);
        setQueryString(searchInput);
      }
    }
  };

  //Change current page and adjust button color
  const goToPage = (e) => {
    console.log(currentPage);
    document.getElementById(currentPage).classList.remove("page-color");
    setCurrentPage(Number(e.target.id));
    document.getElementById(Number(e.target.id)).classList.add("page-color");
  };

  //go to first page
  const getFirst = (e) => {
    if (currentPage > 1) {
      document.getElementById(currentPage).classList.remove("page-color");
      setCurrentPage(1);
      document.getElementById(1).classList.add("page-color");
    }
  };

  //go to previous page
  const getPrevious = (e) => {
    if (currentPage > 1) {
      document.getElementById(currentPage - 1).classList.add("page-color");
      document.getElementById(currentPage).classList.remove("page-color");
      setCurrentPage(currentPage - 1);
    }
  };

  //go to next page
  const getNext = (e) => {
    var pageCount = results.length / resultsPerPage;
    if (currentPage < pageCount) {
      document.getElementById(currentPage + 1).classList.add("page-color");
      document.getElementById(currentPage).classList.remove("page-color");
      setCurrentPage(currentPage + 1);
    }
  };

  //go to last page
  const getLast = (e) => {
    var pageCount = Math.ceil(results.length / resultsPerPage);
    if (currentPage < pageCount) {
      document.getElementById(currentPage).classList.remove("page-color");
      setCurrentPage(pageCount);
      document.getElementById(pageCount).classList.add("page-color");
    }
  };

  return (
    <div className="results-body">
      <div className="result-header navbar fixed-top">
        <span className="logo" onClick={goToHome}>
          {" "}
          LOOK ME UP{" "}
        </span>
        <div className="search-section search-bar">
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
      <div className="result-block">
        {dispResults.map((result, index) => (
          <SearchResult
            className="search-result"
            siteName={result.siteName}
            pageTitle={result.pageTitle}
            URL={result.URL}
            preview={result.preview}
            key={index}
          ></SearchResult>
        ))}
      </div>
      <div className="result-footer justify-content-center fixed-bottom">
        <div id="pages">
          <button
            id="first"
            className="page fas fa-angle-double-left"
            onClick={getFirst}
          ></button>
          <button
            id="previous"
            className="page fas fas fa-angle-left"
            onClick={getPrevious}
          ></button>
          {pages.map((n) => (
            <button
              key={n}
              id={n}
              onClick={goToPage}
              className="page overflow-pages"
            >
              {" "}
              {n}{" "}
            </button>
          ))}
          <button
            id="next"
            className="page fas fa-angle-right"
            onClick={getNext}
          ></button>
          <button
            id="last"
            className="page fas fa-angle-double-right"
            onClick={getLast}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Results;
