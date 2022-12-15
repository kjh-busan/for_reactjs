import { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const rsp = ['rock', 'scissor', 'paper'];
  const [hands, setHands] = useState(rsp[0]);
  const interval = useRef();
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    interval.current = setInterval(changeHands, 100);
    // console.log('useEffect:',interval.current);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  // useEffect(() => {
  //   interval.current = setInterval(changeHands, 300);
  // }, []);

  const changeHands = () => {
    setHands(rsp[Math.floor(Math.random() * 3)]);
  }

  const onClick = (value) => {
    // value.preventDefault();
    
    clearInterval(interval.current);

    if (value === hands) {
      setResult('Draw!');
    } else if(value === 'rock') {
      if(hands === 'scissor') {
        setResult('You Win');
        setScore((prev) => prev + 1);
      } else {
        setResult('You Lose');
        setScore((prev) => prev - 1);
      }
    } else if(value === 'scissor') {
      if(hands === 'paper') {
        setResult('You Win');
        setScore((prev) => prev + 1);
      } else {
        setResult('You Lose');
        setScore((prev) => prev - 1);
      }
    }else if(value === 'paper') {
      if(hands === 'rock') {
        setResult('You Win');
        setScore((prev) => prev + 1);
      } else {
        setResult('You Lose');
        setScore((prev) => prev - 1);
      }
    }

    setTimeout(() => {
      setResult('');
      interval.current = setInterval(changeHands, 100);
    }, 1000);
  }
  return (
    <><div className="computer">
        COM : {hands} <br/>
        <div className='wincolor'>{result}</div>
    </div>
      <div>
        <button onClick={() => onClick('rock')}>rock</button>
        <button onClick={() => onClick('scissor')}>scissor</button>
        <button onClick={() => onClick('paper')}>paper</button>
      </div>
      <div>점수 : {score}</div>
    </>
  );
}

export default App;
