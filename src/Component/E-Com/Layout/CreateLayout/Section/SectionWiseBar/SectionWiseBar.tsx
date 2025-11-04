import React from "react";
import type ISectionWiseBar from "./ISectionWiseBar";
import type ILayoutInterface from "../../../../../../Services/Interface/CreateLayoutInterface";

const SectionWiseBar: React.FC<ISectionWiseBar> = ({ data, deleteSectionHandler }) => {
    return (
        <div className="my-4">
            <div>
                <p className="text-lg text-[#212529] font-medium ">Current Flow:-</p>
            </div>
            <div className="flex gap-4 p-2">
                {data.map((item: ILayoutInterface, index: number) => (
                    <>
                        <div className="flex bg-[#003566] p-2 rounded-lg shadow-sm">
                            <p className="m-0 text-base text-[#dee2e6] flex justify-center items-center">{item.sectionType}</p>
                            <p className="m-0 mx-2 cursor-pointer flex justify-center items-center" onClick={() => deleteSectionHandler(index)}>
                                <i className="bi bi-x-circle text-base text-[#dee2e6]" />
                            </p>
                        </div>
                        {index + 1 !== data.length && <p className="my-4 w-10  border-1 border-[#6c757d] "></p>}
                    </>
                ))}
                {data.length === 0 && (
                    <div className="flex justify-center items-center w-full">
                        <p className="m-0 font-medium text-lg text-[#495057]">You must select at least one section.</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default SectionWiseBar;