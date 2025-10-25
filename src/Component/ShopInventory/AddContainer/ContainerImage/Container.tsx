import React from "react";
import type IContainer from "./IContainer";

const Container: React.FC<IContainer> = ({ rows, columns , rowHeight , columnWidth }) => {
    return (
        <div>
            <div>
                <p className={`text-sm text-[#212529] underline font-semibold`}>Container Architecture Design:-</p>
            </div>
            <div className={`border border-[#6c757d] bg-[#adb5bd] rounded-lg ml-14 w-152 p-1 `} style={{ height: "510px", width: "600px" }}>
                {rows.map((item, index) => {
                    return <div className={`bg-[#e9ecef]  border border-black rounded-sm  m-1 flex`} style={{ height: `${item}px`, width: "585px" }}>
                        {columns[index].map((item1 , index1) => {
                            return (
                                <div className={` border border-black bg-[#ced4da] m-1 rounded-lg flex justify-center items-center flex-col`} style={{ width: `${item1.length === 0 ? 0 : Number(item1) - 10}px`, height: `${Number(item) - 10}px` }}>
                                    {item1.length > 0 && <>
                                        <p className={`m-0 text-base font-semibold text-[#212529]`}>Height : <span className="text-[#343a40]">{rowHeight[index]}</span></p>
                                        <p className={`m-0 text-base font-semibold text-[#212529]`}>Width : <span className="text-[#343a40]">{columnWidth[index][index1]}</span></p>
                                    </>}
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
        </div>
    )
};

export default Container;