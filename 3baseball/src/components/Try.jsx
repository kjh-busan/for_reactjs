import React, { memo } from 'react';

const Try = memo(({tryInfo}) => {
  console.log('tryInfo : ' , tryInfo);
  // {tries: tries.length, inputValue: inputValue, strike: strike, ball: ball}
  return (
    <li>
      <span>{tryInfo.tries}회차 : </span>
      <span>{tryInfo.inputValue} = </span>
      <span>{tryInfo.strike}strike, </span>
      <span>{tryInfo.ball}ball</span>
    </li>
  );
});

export default Try;
