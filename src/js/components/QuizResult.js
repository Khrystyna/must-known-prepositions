import React from 'react';
import '../../style/quiz-result.css';

const QuizResult = ({totalAmount, value}) => (
  <div className="quiz-result">
    <em className="quiz-result__correct-amount">{value}</em> / {totalAmount}
  </div>
);

export default QuizResult;
