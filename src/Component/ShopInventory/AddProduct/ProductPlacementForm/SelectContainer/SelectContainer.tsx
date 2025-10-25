import React from "react";
import type ISelectContainer from "./ISelectContainer";
import ContainerButton from "./ContainerButton/ContainerButton";

const SelectContainer: React.FC<ISelectContainer> = ({ containerDetails, containerSelectHandler }) => {
    return (
        <div>
            <div>
                <p className="text-base font-normal text-shadow-xs underline">Choose a Container :-</p>
            </div>
            <div className="flex mt-10 flex-wrap">
                {containerDetails.map((containerDetail: { ContainerName: string, AvaliableSpace: number, ID: number }) => <ContainerButton containerData={containerDetail} containerSelectHandler={containerSelectHandler} />)}
            </div>
        </div>
    )
};

export default SelectContainer;