import React, { useState, useReducer, useCallback, useEffect } from "react";
import Table from "./Table";

const initialState = {
  winner: null,
  turn: "O",
  tableData: [["", "", ""], ["", "", ""], ["", "", ""]],
  recentCell: [-1, -1]
};

export const SET_WINNER = "SET_WINNER";
export const SET_DRAW = "SET_DRAW";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner
      };
    case SET_DRAW:
      return {
        ...state,
        winner: "-"
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      };
    }
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O"
      };
    case RESET_GAME:
      return {
        ...state,
        turn: "O",
        tableData: [["", "", ""], ["", "", ""], ["", "", ""]],
        recentCell: [-1, -1]
      };
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;

    if (row < 0) {
      return;
    }
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }

    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true;
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_DRAW });
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {/*{winner && <div>{winner}님이 승리</div>}*/}
      {winner === "O" && <div>O님이 승리</div>}
      {winner === "X" && <div>X님이 승리</div>}
      {winner === "-" && <div>무승부</div>}
    </>
  );
};

export default TicTacToe;