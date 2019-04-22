import React, { Component } from 'react';
import './Quiz.scss';
import Tone from 'tone';
import queryString from 'query-string';

import Questions from './Questions';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = { settings: {}, started: false }

    this.onStart = this.onStart.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }


  playC() {
    var synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease('C4', '8n');
  }

  onStart() {
    this.setState({ started: true });
  }

  // Allow settings to be changed
  endQuiz() {
    this.setState({ started: false });
  }

  // WIP: settings should be stored in the GET params
  static getDerivedStateFromProps(props, state) {
    let params = queryString.parse(props.location.search);

    return { settings: params }
  }

  render() {
    if (this.state.started) {
      let settings = this.state.settings;
      return (
        <Questions nQuestions={settings.nQuestions || 5} endQuiz={this.endQuiz} />
      );
    } else {
      return (
        <div className="Quiz Settings">
          <div className="Content">
            <div className="Card">
              <h1>In the future you will be able to specify settings for the quiz here</h1>
            </div>

            <div className="Card">
              <h1>Would you like to hear a middle C first?</h1>
              <div onClick={this.playC} className="button button-centre">Play</div>
            </div>

            <div className="Card">
              <h1>Ready to begin?</h1>
              <div className="button button-centre" onClick={this.onStart}>Yes!</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Quiz;
