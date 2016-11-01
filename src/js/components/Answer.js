import React from 'react';

const Answer = ({body, value}) => {
  if (body[1] === value.trim().toLowerCase()) {
    return <span className='question-result'>Correct!</span>;
  } else {
    return  (
      <span className="question-result question-result__wrong">
         Wrong. Correct answer is <em>{body[1]}.</em><br/>
      </span>
    );
  }

}

export default Answer;