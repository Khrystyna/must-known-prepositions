import React from 'react';
import '../../style/progress.css';

const QuizProgress = ({totalAmount, value}) => (
  <div className="progress-bar" data-progres={value} data-total={totalAmount}>
    <div className="progress-bar__progress" style={{width : Math.round(value * 100 / totalAmount) + '%'}}></div>
  </div>
);

export default QuizProgress;
