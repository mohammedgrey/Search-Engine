import React ,{ Component} from 'react';
import "./Home.scss"

export class Home extends Component {

  //when clicking on the search button
  search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("home-input").value;
    if (searchInput !=="") {
      this.props.history.push('/Home/Results/');
    }
    
  };
  
  changePosition = (e) => {
    e.preventDefault();
    var element= document.getElementById("star");
    element.style.top= (100*Math.random()) + "%";
    element.style.left= (100*Math.random()) + "%";
  }

  render() {
    return (
      <div className="home-body">

        <div className="search-section">

          <h1>  LOOK ME UP  </h1>
          <h6> I got everything you need </h6>
          
          <div className="d-flex align-items-center justify-content-center">
            <input id="home-input" type="text" className="form-control" placeholder="Watcha lookin' for?"></input>
            <button className="fas fa-search search-button" onClick={this.search}></button>
          </div>
          
        </div>

      </div>
    );
  }

};

export default Home;