import React ,{ Component} from 'react';
import "./Results.scss";
import SearchResult from "./SearchResult";

const initialState = {

  results: [
    {siteName: "Wikipedia", pageTitle: "State of Palestine", URL: "https://en.wikipedia.org", preview: "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967."},
    {siteName: "Today's latest from Al Jazeera", pageTitle: "Palestine", URL: "https://www.aljazeera.com", preview: "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict ..."},
    {siteName: "Britannica", pageTitle: "Palestine | History, People, & Religion", URL: "https://www.britannica.com", preview: "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic ..."},
    {siteName: "HISTORY", pageTitle: "Palestine - History, Religion & Conflicts", URL: "https://www.history.com", preview: " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the ..."},
    {siteName: "Amnesty", pageTitle: "Everything you need to know about human rights in Israel and ...", URL: "https://www.amnesty.org", preview: "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and ..."},
    {siteName: "Wikipedia", pageTitle: "State of Palestine", URL: "https://en.wikipedia.org", preview: "The entirety of territory claimed by the State of Palestine has been occupied since 1948, first by Egypt and Jordan and then by Israel after the Six-Day War in 1967."},
    {siteName: "Today's latest from Al Jazeera", pageTitle: "Palestine", URL: "https://www.aljazeera.com", preview: "Root causes of Israel-Palestine conflict must be addressed: UNRWA. Philippe Lazzarini said situation in Gaza getting worse because the very basis of the conflict ..."},
    {siteName: "Britannica", pageTitle: "Palestine | History, People, & Religion", URL: "https://www.britannica.com", preview: "Palestine, area of the eastern Mediterranean, comprising parts of modern Israel along with the West Bank and the Gaza Strip. The strategic ..."},
    {siteName: "HISTORY", pageTitle: "Palestine - History, Religion & Conflicts", URL: "https://www.history.com", preview: " Palestine is a small region of land in the eastern Mediterranean region that includes parts of modern Israel and the Palestinian territories of the ..."},
    {siteName: "Amnesty", pageTitle: "Everything you need to know about human rights in Israel and ...", URL: "https://www.amnesty.org", preview: "Israel and Occupied Palestinian Territories 2020. Israel continued to impose institutionalized discrimination against Palestinians living under its rule in Israel and ..."},
  ],
  searchInput: "palestine",

};

export class Results extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    document.getElementById("input").value = this.state.searchInput;
  }

  //when clicking on the search button
  search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("input").value;
    if (searchInput !=="") {
      this.props.history.push('/Home/Results/');
    }
    
  };

  render() {
    return (
      <div className="results-body">
        
        <div className="result-header navbar fixed-top">  
          <span className="logo"> LOOK ME UP </span>
          <div className="search-section search-bar">
            <div className="d-flex align-items-center justify-content-left">
                <input id="input" type="text" className="form-control" placeholder="Watcha lookin' for?"></input>
                <button className="fas fa-search search-button-2" onClick={this.search}></button>
            </div>
          </div>
        </div>

        {this.state.results.map((result,index)=>(   
                <div className="result-block"> 
                  <SearchResult className="search-result" siteName={ result.siteName} pageTitle={result.pageTitle}
                  URL={result.URL} preview={result.preview}></SearchResult>
                </div>  
            ))}

        <div className="result-footer"> add paging here </div>

      </div>
    );
  }

};

export default Results;