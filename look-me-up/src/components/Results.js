import React, { Component } from "react";
import getParameterByName from "../helpers/getParameterByName";
import "./Results.scss";
import SearchResult from "./SearchResult";

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
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
          pageTitle: "Everything you need to know about human rights in Israel and ...",
          URL: "https://www.amnesty.org",
          preview:
            "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and. Lorem ipsum dolor sit amet, ubique atomorum his cu. Eu est error vitae ignota. Dicit inermis nostrum mei id, has at rationibus adversarium consequuntur. Inimicus sadipscing deterruisset ea nec, sit eu perfecto salutatus, sea persius expetenda an. His dolorem aliquando ex, tollit deleniti cotidieque no per. Ne eos laboramus honestatis, eos te elit facilisi.",
        },
      ],
      searchInput: "palestine",
      currentPage: 1,
      resultsPerPage: 8,
      queryString: "",
    };
  }

  componentDidMount() {
    document.getElementById("input").value = this.state.searchInput;
    document.getElementById(this.state.currentPage).classList.add("page-color");
    //get the search query to send a request
    const queryString = getParameterByName("q");
    this.setState({ queryString }, () => {
      console.log(queryString);
    });
  }

  //go to home page on logo click
  goToHome = (e) => {
    this.props.history.push("/");
  };

  //when clicking on the search button
  search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("input").value;
    if (searchInput !== "") {
      this.props.history.push("/Home/Results/");
    }
  };

  //when pressing enter
  searchEnter = (e) => {
    if (e.keyCode === 13) {
      var searchInput = document.getElementById("input").value;
      if (searchInput !== "") {
        this.props.history.push("/Home/Results/");
      }
    }
  };

  //Change current page and adjust button color
  goToPage = (e) => {
    document.getElementById(this.state.currentPage).classList.remove("page-color");
    this.setState({ currentPage: Number(e.target.id) }, function () {
      document.getElementById(Number(e.target.id)).classList.add("page-color");
    });
  };

  //go to first page
  getFirst = (e) => {
    if (this.state.currentPage > 1) {
      document.getElementById(this.state.currentPage).classList.remove("page-color");
      this.setState({ currentPage: 1 }, function () {
        document.getElementById(this.state.currentPage).classList.add("page-color");
      });
    }
  };

  //go to previous page
  getPrevious = (e) => {
    if (this.state.currentPage > 1) {
      document.getElementById(this.state.currentPage).classList.remove("page-color");
      this.setState({ currentPage: this.state.currentPage - 1 }, function () {
        document.getElementById(this.state.currentPage).classList.add("page-color");
      });
    }
  };

  //go to next page
  getNext = (e) => {
    var pageCount = this.state.results.length / this.state.resultsPerPage;
    if (this.state.currentPage < pageCount) {
      document.getElementById(this.state.currentPage).classList.remove("page-color");
      this.setState({ currentPage: this.state.currentPage + 1 }, function () {
        document.getElementById(this.state.currentPage).classList.add("page-color");
      });
    }
  };

  //go to last page
  getLast = (e) => {
    var pageCount = Math.ceil(this.state.results.length / this.state.resultsPerPage);
    if (this.state.currentPage < pageCount) {
      document.getElementById(this.state.currentPage).classList.remove("page-color");
      this.setState({ currentPage: pageCount }, function () {
        document.getElementById(this.state.currentPage).classList.add("page-color");
      });
    }
  };

  render() {
    //calculate the total number of pages
    const { results, currentPage, resultsPerPage } = this.state;
    const totalPagesNum = Math.ceil(results.length / resultsPerPage);
    const pages = [];
    for (var i = 1; i <= totalPagesNum; i++) pages.push(i);

    //Choose the portion of results to display
    const lastResult = currentPage * resultsPerPage;
    const firstResult = lastResult - resultsPerPage;
    const dispResults = results.slice(firstResult, lastResult);

    return (
      <div className="results-body">
        <div className="result-header navbar fixed-top">
          <span className="logo" onClick={this.goToHome}>
            {" "}
            LOOK ME UP{" "}
          </span>
          <div className="search-section search-bar">
            <div className="d-flex align-items-center justify-content-left">
              <button id="voice2" className="fas fa-microphone-alt"></button>
              <input id="input" type="text" className="form-control" placeholder="Watcha lookin' for?" onKeyDown={this.searchEnter} autoComplete="off"></input>
              <button className="fas fa-search search-button-2" onClick={this.search}></button>
            </div>
          </div>
          {/*<span className="fas fa-bars menu-icon"></span>*/}
        </div>
        <div className="result-block">
          {dispResults.map((result, index) => (
            <SearchResult className="search-result" siteName={result.siteName} pageTitle={result.pageTitle} URL={result.URL} preview={result.preview} key={index}></SearchResult>
          ))}
        </div>
        <div className="result-footer justify-content-center fixed-bottom">
          <div id="pages">
            <button id="first" className="page fas fa-angle-double-left" onClick={this.getFirst}></button>
            <button id="previous" className="page fas fas fa-angle-left" onClick={this.getPrevious}></button>
            {pages.map((n) => (
              <button key={n} id={n} onClick={this.goToPage} className="page overflow-pages">
                {" "}
                {n}{" "}
              </button>
            ))}
            <button id="next" className="page fas fa-angle-right" onClick={this.getNext}></button>
            <button id="last" className="page fas fa-angle-double-right" onClick={this.getLast}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
