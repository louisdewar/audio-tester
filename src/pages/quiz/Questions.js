import React, { Component } from 'react';
import Tone from 'tone';
import classnames from 'classnames';

import {shuffle} from 'common/util';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.onChoice = this.onChoice.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
    this.reset = this.reset.bind(this);

    this.state = this.reset();
  }

  reset() {
    // Pick 5 different random notes
    let questions = shuffle(POSSIBLE_NOTES).slice(0, 5);

    // Generate the random choices for each note
    let question_choices = questions.map(note => {
      // Pick the three random choices
      let notes = shuffle(POSSIBLE_NOTES.filter(pnote => pnote !== note)).slice(0, 3);
      notes.push(note);

      notes = notes.map(pnote => pnote.substring(0, pnote.length - 1));

      return shuffle(notes)
    })

    return { responses: Array(questions.length).fill(null), choices: Array(questions.length).fill(null), finished: false, questions, question_choices };
  }

  onChoice(questionNumber, choice) {
    this.setState(state => {
      let note = state.questions[questionNumber];
      // Get rid of the octave number e.g. C4 -> C, C#3 -> C#
      let letter = note.substring(0, note.length - 1);
      let correct = choice === letter;

      let responses = state.responses;
      responses[questionNumber] = correct;

      let choices = state.choices;
      choices[questionNumber] = choice;

      return { responses, choices };
    })
  }

  completeQuiz() {
    this.setState({ finished: true })
  }

  restartQuiz() {
    this.setState(this.reset());
  }

  render() {
    let lastCard;
    if (this.state.finished) {
      let nCorrect = this.state.responses.filter(correct => correct).length;

      lastCard = (
        <div className="Card end">
          <p>You scored {nCorrect}/{this.state.responses.length}!</p>
          <br />
          <div className="button" onClick={this.restartQuiz}>Restart</div>
        </div>
      );
    } else {
      lastCard = (
        <div className="Card end">
          <p>Are you ready to end the test?</p>
          <p>Any empty responses will be marked as incorrect.</p>
          <br />
          <div className="button" onClick={this.completeQuiz}>End quiz</div>
        </div>
      );
    }

    return (
      <div className="Quiz">
        <div className="Content">
          {this.state.questions.map((note, i) => (
            <Card key={i}
            revealAnswer={this.state.finished}
            choice={this.state.choices[i]}
            correct={this.state.responses[i]}
            questionNumber={i + 1}
            onChoice={this.onChoice.bind(this, i)}
            note={this.state.questions[i]}
            notes={this.state.question_choices[i]}
            />
          ))}
          {lastCard}
        </div>
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super(props);

    this.listen = this.listen.bind(this);
  }

  listen(note) {
    //create a synth and connect it to the master output (speakers)
    var synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease(note, '8n');
  }

  render() {
    let buttonGrid = this.props.notes.map((note, i) => {
      let selected = this.props.choice === note;
      if (this.props.revealAnswer) {
        return (
          <div className={classnames({ 'button': true, 'wrong': selected && !this.props.correct, 'correct': selected && this.props.correct, selected })} key={i}>
            {note}
          </div>
        );
      } else {
        return (
          <div className={classnames({ 'button': true, 'selected': selected })} key={i} onClick={() => this.props.onChoice(note)}>
            {note}
          </div>
        );
      }
    });

    return(
      <div className="Card" id={'q-' + this.props.questionNumber}>
        <span className="number">{this.props.questionNumber}.</span>
        <h2 className="listen" onClick={this.listen.bind(null, this.props.note)}>Listen: &#9654;</h2>

        <p className={classnames({ 'correct': this.props.revealAnswer && this.props.correct, 'wrong': this.props.revealAnswer && !this.props.correct })}>{this.props.revealAnswer? 'It was: ' + this.props.note.substring(0, this.props.note.length - 1): 'What note is this?'}</p>
        <div className="grid">
          {buttonGrid}
        </div>
      </div>
    );
  }
}

export default Quiz;
