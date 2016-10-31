import React from 'react';
const Question = ({body, value, onChange}) => (
  <p className="question">
    {body[0]}
    <input type="text" value = {value} onChange = {onChange}/>
    {body[2]}
  </p>
);

export default Question;