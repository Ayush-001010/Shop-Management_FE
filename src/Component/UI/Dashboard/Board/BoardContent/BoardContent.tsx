import React from "react";
import type IBoardContent from "./IBoardContent";
import InventoryCard from "../Card/InventoryCard/InventoryCard";
import { useGetDashboardContextValue } from "../../Dashboard";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const BoardContent: React.FC<IBoardContent> = ({ data, boardCardType, tableConfig }) => {
    const { boardHeaders, changeBoardCardFieldPosition } = useGetDashboardContextValue();
    const genrateCard = (item: Record<string, any>, header: string, id: number) => {
        switch (boardCardType) {
            case "Inventory": {
                return (
                    <InventoryCard item={item} tableConfig={tableConfig} header={header} id={id} />
                )
            }
            default: <></>;
        }
        return <></>
    }
    const changeHandler = (activeID: string | number , overID: string | number , boardIndex: number) => {
        changeBoardCardFieldPosition(Number(activeID), Number(overID), boardIndex);
    }
    const sensor = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
    data = data.map(items => items.map((value, index) => {
        return { ...value, id: index }
    }))
    return (
        <div className="flex justify-content">
            {data.map((item, index) => {
                if (!boardHeaders[index].value) return;
                if (item.length === 0) return <div className="w-xs m-2"></div>
                return <DndContext collisionDetection={closestCorners} sensors={sensor} onDragEnd={({ active, over }: any) => changeHandler(active?.id, over?.id, index)}>
                    <SortableContext items={item as any} >
                        <div className="flex flex-col w-xs mx-1">
                            {item.map(value => {
                                return (<div>
                                    {genrateCard(value, boardHeaders[index].title, value.id)}
                                </div>)
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            })
            }
        </div>
    )
};

export default BoardContent;