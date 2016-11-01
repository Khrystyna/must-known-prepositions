import React, { Component } from 'react';
import '../../style/question.css';
import {
  getQuestions,
  getQuestionsAmount
} from "../api";

import QuizResult from './QuizResult';
import Question from './Question';
import Answer from './Answer';

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

    const {userAnswer, currentQuestion, result} = this.state;

    if (!userAnswer) { return false; }

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentQuestion[1];
    
    this.setState({
      isFormSubmitted: true,
      isAnswerCorrect,
      result: isAnswerCorrect ? result + 1 : result
    });
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

  next(event){
    event.preventDefault();
    this.setState(this.getNextState());
  }

  renderSummaryResults () {
    return (
      <span className="question">
        Well done!<br/>
        <button onClick={this.reset}>Try again</button>
      </span>
    )
  }

  getQuestionStatus () {
    const {isFormSubmitted, isAnswerCorrect} = this.state;

    return isFormSubmitted
        ? isAnswerCorrect ? 'correct' : 'wrong'
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
        <form onSubmit={(isFormSubmitted && isNextQuestionAvailable) ? this.next : this.check}>
          {currentQuestion
            ? <Question
                status={this.getQuestionStatus()}
                body={currentQuestion}
                value={userAnswer}
                onChange={this.update}/>
            : this.renderSummaryResults()
          }

          { isFormSubmitted && <Answer body={currentQuestion} value={userAnswer}/>}

          { isNextQuestionAvailable && isFormSubmitted  &&
            <span className='question-result'><br/>Press Enter to continue</span>}

          { isNextQuestionAvailable && !isFormSubmitted &&
            <span className='question-result'>Press Enter to check the answer</span>}

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
