import React, { useEffect, useState } from "react";
import type IContent from "./IContent";
import { useGetDashboardContextValue } from "../../Dashboard";
import Note from "./Note/Note";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";


const Content: React.FC<IContent> = () => {
    const { notes } = useGetDashboardContextValue();
    const [notesData, setNotesData] = useState<Array<any>>([]);

    const changeHandler = (activeID: string | number, overID: string | number) => {
        setNotesData((prevState: Array<any>) => {
            if (activeID < overID) {
                const data = prevState[Number(activeID)];
                for (let index: number = Number(activeID); index < Number(overID); index++) {
                    prevState[index] = prevState[index + 1];
                }
                prevState[Number(overID)] = data;
            } else {
                const data = prevState[Number(activeID)];
                for (let index: number = Number(activeID); index > Number(overID); index--) {
                    prevState[index] = prevState[index - 1];
                }
                prevState[Number(overID)] = data;
            }
            prevState = prevState.map((item, index) => {
                return { ...item, id: index }
            });
            return [...prevState];
        })
    }
    useEffect(() => {
        if (notes) {
            setNotesData(notes.map((item, index) => {
                return { ...item, id: index }
            }))
        }
    }, [notes])
    const sensor = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    return (
        <div className="mt-1 overflow-auto h-90">
            <DndContext collisionDetection={closestCorners} sensors={sensor} onDragEnd={({ active, over }: any) => changeHandler(active?.id, over?.id)}>
                <SortableContext items={notesData as any} >
                    {notesData?.map((item) => (
                        <Note data={item} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
};

export default Content;