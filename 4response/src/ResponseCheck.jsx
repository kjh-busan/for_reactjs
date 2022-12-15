import React, { useState, useRef } from 'react';
import './style.css';

function ResponseCheck() {
  const [state, setState] = useState('waitingAqua');
  const [message, setMessage] = useState('클릭하면 시작합니다');
  const [isReset, setIsReset] = useState(false);
  const [result, setResult] = useState('');
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if(isReset) return;
    console.log('onClickScreen');
    if(state === 'waitingAqua') {
      setMessage('빨간색으로 바뀌면 클릭!');
      setState('readyYellow');
      timeout.current = setTimeout(() => {
        setState('nowRed');
        setMessage('지금 클릭!!');
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000 + 155));
    } else if(state === 'nowRed') {
      endTime.current = new Date().getTime();
      setMessage('완료!!!!!!!!');
      setResult(endTime.current - startTime.current);
      setIsReset(true); 
    } else if (state === 'readyYellow') {
      setState('failGray');
      setMessage('좀 성급했네요');
      clearTimeout(timeout.current);
      setIsReset(true); 
    }
  }
  const onReset = () => {
    // setResult([]);
    setIsReset(false); 
    setMessage('클릭하면 시작합니다');
    setState('waitingAqua');
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      { isReset && <div>{result}ms</div>}
      { isReset && <button id="reset" onClick={onReset}>Reset</button>}

    </>
  )
}

export default ResponseCheck;