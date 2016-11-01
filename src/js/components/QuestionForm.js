import React, { Component } from 'react';
import '../../style/question.css';
import {
  getQuestions,
  getQuestionsAmount
} from "../api";

import QuizResult from './QuizResult';
import Question from './Question';

import {shuffle} from 'underscore';
import {makeIterator} from '../utils/helpers';

class QuestionForm extends Component {
  constructor(){
    super();

    this.allQuestions = makeIterator(shuffle(getQuestions()));

    this.state = {
      ...this.getNextState(),
      result: 0,
      totalQuestionsAmount: getQuestionsAmount()
    };

    this.update = this.update.bind(this);
    this.check = this.check.bind(this);
    this.next = this.next.bind(this);
    this.reset = this.reset.bind(this);
  }

  update(event) {
    if (!this.state.isFormSubmitted) {
      this.setState({userAnswer: event.target.value});
    }
  }

  reset () {
    this.allQuestions = makeIterator(shuffle(getQuestions()));

    this.setState({
      ...this.getNextState(),
      result: 0,
      totalQuestionsAmount: getQuestionsAmount()
    });
  }

  check(event){
    event.preventDefault();

    const {
      userAnswer,
      isFormSubmitted,
      isNextQuestionAvailable,
      currentQuestion
    } = this.state;

    if (!userAnswer) { return false; }
    if (isFormSubmitted && isNextQuestionAvailable) {
      return this.next();
    }

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentQuestion[1];
    
    this.setState((prevState, props) => ({
      isFormSubmitted: true,
      isAnswerCorrect,
      result: isAnswerCorrect ? prevState.result + 1 : prevState.result
    }));
  }

  getNextState() {
    let question = this.allQuestions.next();
    return {
      userAnswer: '',
      isFormSubmitted: false,
      isAnswerCorrect: false,
      currentQuestion: question.value,
      isNextQuestionAvailable: !question.done
    };
  }

  next(){
    this.setState(this.getNextState());
  }

  getResultMessage () {
    const {
      isFormSubmitted,
      isAnswerCorrect,
      currentQuestion,
      isNextQuestionAvailable
    } = this.state;

    if (isFormSubmitted && isAnswerCorrect) {
      return (
        <span className='question-result'>
          Correct!
          {isNextQuestionAvailable ? 'Press Enter to continue.' : ''}
          <br/>
        </span>
      );
    } else if (isFormSubmitted && !isAnswerCorrect) {
      return  (
        <span className="question-result question-result__wrong">
         Wrong. Correct answer is <em>{currentQuestion[1]}.</em><br/>
         {isNextQuestionAvailable ? 'Press Enter to continue.' : ''}
        </span>
      );
    } else if (isNextQuestionAvailable) {
      return <span className='question-result'>Press Enter to check the answer</span>;
    }
  }

  renderResults () {
    return (
      <span className="question">
        Well done!<br/>
        <button onClick={this.reset}>Try again</button>
      </span>
    )
  }

  getQuestionState () {
    const {isFormSubmitted, isAnswerCorrect} = this.state;

    return isFormSubmitted
        ? isAnswerCorrect ? 'success' : 'wrong'
        : 'pending'
  }

  render() {
    const {
      isFormSubmitted,
      isNextQuestionAvailable,
      currentQuestion,
      userAnswer,
      totalQuestionsAmount
    } = this.state;

    return (
      <div>
        <form onSubmit={this.check.bind(this)}>
          {currentQuestion
            ? <Question
                state={this.getQuestionState()}
                body={currentQuestion}
                value={userAnswer}
                onChange={this.update}/>
            : this.renderResults()
          }

          <p>{this.getResultMessage()}</p>
          
          <p>
            {isNextQuestionAvailable
              ? <button
                  type="button"
                  onClick={this.next}
                  disabled={!isFormSubmitted}
                  hidden={!isNextQuestionAvailable}
                >Next question</button>
              : "No more questions"
            }
          </p>

        </form>

        <QuizResult value={this.state.result} totalAmount={totalQuestionsAmount}/>

      </div>
    );
  }
}

export default QuestionForm;
