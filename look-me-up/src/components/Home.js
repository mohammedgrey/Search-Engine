import React ,{ Component} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useHistory } from "react-router-dom";
import "./Home.scss"

const Home = () => {

  var recording= false;
  let history= useHistory();

  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  //when clicking on the search button
  const search = (e) => {
    e.preventDefault();
    var searchInput = document.getElementById("home-input").value;
    if (searchInput !=="") {
      history.push('/Home/Results/');
    }
    
  }

    //when pressing enter
    const searchEnter = (e) => {
      if(e.keyCode == 13) {
        var searchInput = document.getElementById("home-input").value;
        if (searchInput !=="") {
          history.push('/Home/Results/');
        }
      }
    }
  
    //start voice recognition
    const voiceRecord= (e) => {
        if(recording==false) {
          recording=true;
          SpeechRecognition.startListening();
        }
        else {
          recording=false;
          SpeechRecognition.stopListening();
        }
    }

    return (
      <div className="home-body">

        <div className="search-section">

          <h1>  LOOK ME UP  </h1>
          <h6> I got everything you need </h6>
          
          <div className="d-flex align-items-center justify-content-center">
            <input id="home-input" type="text" className="form-control" placeholder="Watcha lookin' for?" onKeyDown={searchEnter}></input>
            <button className="fas fa-search search-button" onClick={search} ></button>
          </div>
          
          <button onClick={voiceRecord}>Start</button>
          <p id="txt">{transcript} .</p> 

        </div>

      </div>
    );
  

};

export default Home;