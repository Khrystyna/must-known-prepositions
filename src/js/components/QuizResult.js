import React from 'react';

const QuizResult = ({totalAmount, value}) => (
  <p>
    <span className="quiz-result">{value} / {totalAmount}</span>
  </p>
);

export default QuizResult;
