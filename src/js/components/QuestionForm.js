import React, { Component } from 'react';
import '../../style/question.css';
import {
  getQuestions,
  getQuestionsAmount
} from "../api";

import QuizResult from './QuizResult';
import Question from './Question';

import {random} from '../utils/helpers';

class QuestionForm extends Component {
  constructor(){
    super();

    this.questions = getQuestions();
    this.totalQuestionsAmount = getQuestionsAmount();

    this.state = {
      /*TODO: 'key' is reserved attribute at React for component list. So, will be better to find
       *      another name.
       *      https://facebook.github.io/react/docs/lists-and-keys.html
       **/
      key: '',
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
    return this.questions.splice(random(1, this.questions.length), 1)[0];
  }

  update(event) {
    this.setState({key: event.target.value});
  }

  check(event){
    event.preventDefault();

    if (!this.state.key || this.state.isFormSubmitted) return false;

    const isAnswerCorrect = this.state.key.trim().toLowerCase() === this.state.body[1];

    this.setState((prevState, props) => ({
      isFormSubmitted: true,
      isAnswerCorrect,
      result: isAnswerCorrect ? prevState.result + 1 : prevState.result
    }));
  }

  next(event){
    this.setState({
      key: '',
      body: this.getRandomQuestion(),
      isFormSubmitted: false,
      isAnswerCorrect: false,
      isNextQuestionAvailable: this.questions.length > 0
    });
  }

  getResultMessage () {
    if (this.state.isFormSubmitted && this.state.isAnswerCorrect) {
      return <span className='question-result'> Correct!</span>;
    } else if (this.state.isFormSubmitted && !this.state.isAnswerCorrect) {
      return  (
        <span className="question-result question-result__wrong">
         Wrong. Correct answer is <em>{this.state.body[1]}</em>
        </span>
      );
    } else { return <span className='question-result'>Press Enter to check the answer</span>; }
  }

  render() {
    let nextButtonAttributes = {
      disabled: !this.state.isFormSubmitted,
      hidden: !this.state.isNextQuestionAvailable
    };

    return (
      <div>
        <form onSubmit={this.check.bind(this)}>
          <Question body = {this.state.body} value={this.state.key} onChange={this.update}/>

          <p>{this.getResultMessage()}</p>

          <p>
            {this.questions.length === 0 ? "No more questions" : ""}
            <button type="button" onClick={this.next} {... nextButtonAttributes}>Next question</button>
          </p>

        </form>

        <QuizResult value={this.state.result} totalAmount = {this.totalQuestionsAmount}/>

      </div>
    );
  }
}

export default QuestionForm;
