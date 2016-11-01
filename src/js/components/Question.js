import React from 'react';
const Question = ({body, value, onChange, status}) => (
  <p className={"question question__" + status}>
    {body[0]}
    <input type="text" value={value} onChange={onChange}/>
    {body[2]}
  </p>
);

Question.propTypes = {
  status: React.PropTypes.oneOf(['wrong', 'correct', 'pending'])
};

Question.defaultProps = {
  status: 'pending'
};

export default Question;