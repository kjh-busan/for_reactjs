import React, { useState, useEffect, useRef, useMemo, useCallback} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  const candidate = Array(45).fill().map((_, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  let result = [...winNumbers, bonusNumber];
  console.log("getWinNumbers: ", result);
  return result;
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    // console.log("mount");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 500);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 3500);
    return () => {
      // console.log("return");
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [winNumbers]); 

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } 
  }, [redo]);

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo: ", winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>ON MORE!</button>}
    </>
  );
};

export default Lotto;
