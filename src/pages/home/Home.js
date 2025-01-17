import React, { Component } from 'react';
import './Home.scss';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Content">
          <div className="Card">
            <h2>How does it work?</h2>

            <p>1. Once you click the button below you will be taken to another page to complete a quiz.</p>
            <p>2. You will be able to click on a button to hear a note, you will then be able to select between several notes.</p>
            <p>3. Once you answer all the questions you select <code>End quiz</code> and your answers will be checked.</p>
          </div>
          <div className="Card">
            <h2>Status of the website</h2>

            <p>This is a very early version of the website, it may not work at all and is likely to change a great deal.</p>
          </div>
          <div className="Card">
            <h2>Are you ready to begin the test?</h2>

            <Link to="/quiz" className="button">Yes!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
