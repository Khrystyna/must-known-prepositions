import React, { Component } from 'react';
import './question.css';

class Question extends Component {
  constructor(){
    super();

    this.questions = [
      ["I appologize", "for", "being late"],
      ["I asked", "for", "some coffee"],
      ["I cared", "for", "him when he was sick"],
      ["Parents protect their children", "from", "problems"],
      ["She suffered", "from", "hay fever"],
      ["I believe", "in", "you!"],
      ["I saved a kitten", "from", "fire!"],
      ["I don't approve", "of", "this behavior"],
      ["This cake smells", "of", "strawberries"],
      ["I need to concentrate", "on", "my homework"],
      ["I agree", "with", "you"],
      ["We agree", "on", "almost everything"]
    ];
    this.totalQuestionsAmount = this.questions.length;

    this.state = {
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
    return this.questions.splice(Math.floor(Math.random()*this.questions.length), 1)[0];
  }

  update(event) {
    this.setState({key: event.target.value});
  }

  check(event){
    event.preventDefault();

    if (!this.state.key || this.state.isFormSubmitted) return false;

    var isAnswerCorrect = this.state.key.trim().toLowerCase() === this.state.body[1];

    this.setState((prevState, props) => ({
      isFormSubmitted: true,
      isAnswerCorrect: isAnswerCorrect,
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

  render() {
    let nextButtonAttributes = {
      disabled: !this.state.isFormSubmitted,
      hidden: !this.state.isNextQuestionAvailable
    };

    return (
      <div>
        <form onSubmit={this.check.bind(this)}>
          <p className="question">
            {this.state.body[0]}

            <input type="text" value={this.state.key}  onChange={this.update}/>

            {this.state.body[2]}
          </p>
          <p>
            <span className={this.state.isAnswerCorrect ? 'question-result' : 'question-result question-result__wrong'} dangerouslySetInnerHTML={{__html: this.state.isFormSubmitted ? (this.state.isAnswerCorrect ? "Correct!" : "Wrong. Correct answer is " + "<em>" + this.state.body[1] + "</em>") : "Press Enter to check the answer"}}></span>
          </p>
          <p>
            {this.questions.length === 0 ? "No more questions" : ""}
            <button type="button" onClick={this.next} {... nextButtonAttributes}>Next question</button>
          </p>
        </form>

        <p>
          <span className="quiz-result">{this.state.result} / {this.totalQuestionsAmount}</span>
        </p>
      </div>
    );
  }
}

export default Question;
