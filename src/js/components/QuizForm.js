import React, { Component } from 'react';
import '../../style/quiz-form.css';

import {
  getQuestions,
  getQuestionsAmount
} from "../api";

import QuizResult from './QuizResult';
import Question from './Question';
import QuizProgress from './QuizProgress';

import {random} from '../utils/helpers';

class QuizForm extends Component {
  constructor(){
    super();

    this.questions = getQuestions();
    this.totalQuestionsAmount = getQuestionsAmount();

    this.state = {
      preposition: '',
      body: this.getRandomQuestion(),
      isAnswerCorrect: false,
      isFormSubmitted :false,
      isNextQuestionAvailable: true,
      result: 0
    };

    this.update = this.update.bind(this);
    this.check = this.check.bind(this);
    this.next = this.next.bind(this);
    this.getRandomQuestion = this.getRandomQuestion.bind(this);
  }

  getRandomQuestion() {
    return this.questions.splice(random(0, this.questions.length-1), 1)[0];
  }

  update(event) {
    this.setState({preposition: event.target.value});
  }

  check(event){
    event.preventDefault();

    if (!this.state.preposition || this.state.isFormSubmitted) return false;

    const isAnswerCorrect = this.state.preposition.trim().toLowerCase() === this.state.body[1];

    this.setState((prevState, props) => ({
      isFormSubmitted: true,
      isAnswerCorrect,
      result: isAnswerCorrect ? prevState.result + 1 : prevState.result
    }));
  }

  next(event){
    this.setState({
      preposition: '',
      body: this.getRandomQuestion(),
      isFormSubmitted: false,
      isAnswerCorrect: false,
      isNextQuestionAvailable: this.questions.length > 0
    });
  }

  getQuestionResultMessage () {
    if (this.state.isFormSubmitted && this.state.isAnswerCorrect) {
      return <span className='question-result'> Correct!</span>;
    }
    else if (this.state.isFormSubmitted && !this.state.isAnswerCorrect) {
      return  (
        <span className="question-result question-result__wrong">
         Wrong. Correct answer is <em className="preposition">{this.state.body[1]}</em>.
        </span>
      );
    }
  }

  getQuizResultMessage () {
    var congratulationMessage = this.state.result > this.totalQuestionsAmount/2 ? "Congrats! " : "Ooops.";

    if (this.questions.length === 0 && this.state.isFormSubmitted) {
      return <div className='quiz-result'> {congratulationMessage} Your result is <em className="preposition">{this.state.result}</em> correct answers of {this.totalQuestionsAmount} questions. </div>;
    }
    else {
      return "";
    }
  }

  render() {
    let nextButtonAttributes = {
      disabled: !this.state.isFormSubmitted,
      hidden: !this.state.isNextQuestionAvailable
    };

    let submitButtonAttributes = {
      disabled: this.state.preposition == "" || this.state.isFormSubmitted,
      hidden: !this.state.isNextQuestionAvailable && this.state.isFormSubmitted
    };

    return (
      <div>

        <form className="quiz-form" onSubmit={this.check.bind(this)}>
          <header><h3> Question {this.totalQuestionsAmount - this.questions.length} </h3></header>

          <QuizProgress value={this.totalQuestionsAmount - this.questions.length} totalAmount={this.totalQuestionsAmount}/>

          <Question body={this.state.body} value={this.state.preposition} onChange={this.update}/>

          <p>{this.getQuestionResultMessage()}</p>

          <footer>
            {this.getQuizResultMessage()}
            <button type="submit" onClick={this.check.bind(this)} {... submitButtonAttributes}>Check</button>
            <button type="button" onClick={this.next} {... nextButtonAttributes}>Next question</button>
          </footer>

        </form>
      </div>
    );
  }
}

export default QuizForm;
