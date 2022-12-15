import React, { useState } from 'react';
function App() {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    // console.log(val , ' : ', inputValue);
    const answer = first * second;
    if (answer === Number(inputValue)) {
      setResult("정답 : " + answer);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    } else {
      setResult("땡!!!");
    }
    setInputValue('');
  }
  const onChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="App">
      {first} 곱하기 {second}는?
      <br/>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={onClick}>제출</button>
      
      <div>
        {result}
      </div>
    </div>
  );
}

export default App;
