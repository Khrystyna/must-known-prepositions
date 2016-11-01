import React from 'react';
const Question = ({body, value, onChange, state}) => (
  <p className={"question question__" + state}>
    {body[0]}
    <input type="text" value={value} onChange={onChange}/>
    {body[2]}
  </p>
);

Question.propTypes = {
  state: React.PropTypes.oneOf(['wrong', 'success', 'pending'])
};

Question.defaultProps = {
  state: 'pending'
};

export default Question;