import React from "react";
import type IBoard from "./IBoard";;
import BoardHeader from "./BoardHeader/BoardHeader";
import BoardContent from "./BoardContent/BoardContent";

const Board: React.FC<IBoard> = ({  data, boardCardType , tableConfig }) => {


    return (
        <div >
            <BoardHeader data={data} />
            <BoardContent data={data} boardCardType={boardCardType} tableConfig={tableConfig} />
        </div>
    )
};

export default Board;