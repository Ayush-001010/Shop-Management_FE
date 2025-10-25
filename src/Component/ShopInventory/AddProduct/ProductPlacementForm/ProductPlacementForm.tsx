import React, { useEffect, useState } from "react";
import type IProductPlacementForm from "./IProductPlacementForm";
import useShopInventoryAction from "../../../../Services/CustomHook/useShopInventoryAction";
import SelectContainer from "./SelectContainer/SelectContainer";
import type { IContainerDetailsInterface } from "../../../../Services/Interface/ShopDetailsInterface";
import ContainerView from "./ContainerView/ContainerView";

const ProductPlacementForm: React.FC<IProductPlacementForm> = ({ changeTheStepHandler }) => {
    const { getContainerDetailsAboutSpace, onePerticularContainerDetails } = useShopInventoryAction();
    const [containerDetails, setContainerDetails] = useState<Array<{ ContainerName: string, AvaliableSpace: number, ID: number }>>([]);
    const [selectedContainerID, setSelectedContainerID] = useState<number | undefined>();
    const [selectedContainerDetails, setSelectedContainerDetails] = useState<IContainerDetailsInterface | undefined>();

    const containerSelectHandler = (value: number) => {
        setSelectedContainerID(value);
    }
    useEffect(() => {
        getContainerDetailsAboutSpace().then((response) => {
            if (response.success) {
                setContainerDetails(response.data);
            }
        })
    }, []);
    useEffect(() => {
        const obj = setTimeout(() => {
            if (selectedContainerID) {
                onePerticularContainerDetails(selectedContainerID).then((response) => setSelectedContainerDetails(response.data as IContainerDetailsInterface));
            }
        }, 1000);
        return () => clearTimeout(obj);
    }, [selectedContainerID])
    return (
        <div>
            {selectedContainerID === undefined && <SelectContainer containerDetails={containerDetails} containerSelectHandler={containerSelectHandler} />}
            {selectedContainerID !== undefined && <>
                <ContainerView data={selectedContainerDetails as IContainerDetailsInterface} changeTheStepHandler={changeTheStepHandler} />
            </>
            }

        </div>
    )
};

export default ProductPlacementForm;