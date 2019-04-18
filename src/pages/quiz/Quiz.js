import React, { Component } from 'react';
import './Quiz.scss';
import Tone from 'tone';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class Quiz extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.onChoice = this.onChoice.bind(this);
  //   this.completeQuiz = this.completeQuiz.bind(this);
  //   this.restartQuiz = this.restartQuiz.bind(this);
  //   this.reset = this.reset.bind(this);
  //
  //   this.state = this.reset();
  // }

  playC() {
    var synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease('C4', '8n');
  }

  static getDerivedStateFromProps(props, state) {
    let params = queryString.parse(props.location.search);
    console.log(params);

    return { settings: params }
  }

  render() {


    return (
      <div className="Quiz Settings">
        <div className="Content">
          <div className="Card">
            <h1>Choose the settings:</h1>
            <p>How many questions?</p>
            <input type="number" />
          </div>

          <div className="Card end">
            <h1>Ready to begin?</h1>
            <Link to="/quiz" className="button">Yes!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Quiz;
