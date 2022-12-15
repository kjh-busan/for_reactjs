import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  console.log("tr rendered");
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            rowIndex={rowIndex}
            cellIndex={i}
            dispatch={dispatch}
            cellData={rowData[i]}
          />
        ))}
    </tr>
  );
});

export default Tr;
