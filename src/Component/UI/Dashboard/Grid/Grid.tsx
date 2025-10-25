import React from "react";
import type IGrid from "./IGrid";
import { useGetDashboardContextValue } from "../Dashboard";
import InventoryDashboardCard from "./Card/inventoryDashboardCard/InventoryDashboardCard";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Grid: React.FC<IGrid> = () => {
    const { gridData: data, boardCardType, changeHandlerOfGridPosition } = useGetDashboardContextValue();
    const sensor = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const changeHandlerOfDrag = (active: any, over: any) => {
        if (active && over)
            changeHandlerOfGridPosition(active.id, over.id)
    }

    return (
        <div className="flex flex-wrap">
            <DndContext collisionDetection={closestCorners} sensors={sensor} onDragEnd={({ active, over }: any) => changeHandlerOfDrag(active, over)}>
                <SortableContext items={data as any} >
                    {data.map((item: any) => {
                        switch (boardCardType) {
                            case "inventoryDashboard": return <InventoryDashboardCard data={item} />
                        }
                        return <></>
                    })}
                </SortableContext>
            </DndContext>
        </div>
    )
};

export default Grid;