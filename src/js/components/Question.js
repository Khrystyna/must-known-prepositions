import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../style/question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    this.textInput.focus();
  }

  render (){
    return (
      <p className="question">
        {this.props.body[0]}
        <input type="text" value={this.props.value} onChange={this.props.onChange} autoFocus ref={(input) => { this.textInput = input; }}/>
        {this.props.body[2]}
      </p>
    );
  }
}

/*const Question = ({body, value, onChange}) => (
  <p className="question">
    {body[0]}
    <input type="text" value={value} onChange={onChange} autoFocus/>
    {body[2]}
  </p>
);*/

export default Question;
