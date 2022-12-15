import React, { useState, useRef, useEffect } from 'react';
import "./Baseball.css";
import Try from './Try';

function getNumbers() {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  // console.log('array = ',array);
  return array;
}

function Baseball() {
  // const tryObj = {
  //   inputValue: '',
  //   answer: [],
  //   result: '',
  //   tries: [],
  // }

  // 4number
  const MAX_TRY = 5;
  const [reset, setReset] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [result, setResult] = useState([]);
  const inputFocus = useRef(null);
  const [tries, setTries] = useState([]);

  useEffect( () => {
    setNumbers(getNumbers());
    inputFocus.current.focus();
  }, []);

  useEffect( () => {
    inputFocus.current.focus();
  }, []);

  function onChange(e) {
    setInputValue(e.target.value);
    // console.log(e.target.value);
  }
  function onClick(e) {
    e.preventDefault();
    
    // console.log('입력숫자 : ', inputValue);
    if (inputValue.length === 0) {
      setResult('입력숫자 없음');
    } else if (inputValue.length < 4) {
      setResult('입력숫자 부족');
    } else {
      setResult("");
    }

    // 숫자가 다 맞았을때
    if(inputValue === numbers.join("") ) {
      setResult('HOMERUN! : ' + inputValue);
      setReset(true);
    } else {
      // 홈런이 아닐때
      console.log('numbers: ' + numbers);
      if(tries.length > MAX_TRY){
        setResult("Failed! ANSWER : ", numbers);
        setReset(true);
      }
      const answerArray = inputValue.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      // console.log('answerArray : ', answerArray);

      for(let i = 0; i < numbers.length; i++) {
        if(numbers[i] === answerArray[i])  {
          strike += 1;
        } else if(answerArray.includes(numbers[i])) {
          ball += 1;
        }
      }
      
      // setTriest([...tries, strike +'strike and ' + ball + 'ball']);
      setTries([...tries, {tries: tries.length + 1, inputValue: inputValue, strike: strike, ball: ball}]);

      // console.log('tries.length: ' + tries.length + ' = ' + strike + ' : ' + ball);
    };

    setInputValue("");
    inputFocus.current.focus();
    
  }

  const onReset = () => {
    setReset(false);
    setResult("");
    setInputValue("");
    setTries([]);
    setNumbers(getNumbers());
    inputFocus.current.focus();
  }

  return (
  <div className="App">
      <h3>Number BaseBall</h3>
      {/* <span>{numbers.join(' ')} || </span> */}
      <span>{MAX_TRY - tries.length}회 남음</span>
      <hr/>
      <input type="text" ref={inputFocus} value={inputValue} 
      id="text" onChange={onChange} maxlength="4" placeholder='input 4numbers'></input>
        <button onClick={onClick}>Click</button>
        <div>{result}</div>
        {reset && <button onClick={onReset}>reset</button>}
        <ul>
        {!reset && tries.map((v, i) => {
            return (
              <Try key={i} tryInfo={v} />
            )})}
        </ul>
  </div>
  );
}

export default Baseball;
