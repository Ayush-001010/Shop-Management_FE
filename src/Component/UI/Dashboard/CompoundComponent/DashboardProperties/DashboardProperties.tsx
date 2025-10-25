import React, { useEffect, useState } from "react";
import type IDashboardProperties from "./IDashboardProperties";
import styles from "../CompoundComponent.module.css";
import { Popover, } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem/SortableItem";


const DashboardProperties: React.FC<IDashboardProperties> = () => {
  const [openPopOver, setOpenPopOver] = useState<boolean>(false);
  const [isFieldPropertiesOpen, setIsFieldPropertiesOpen] = useState<boolean>(true);
  const { property, hideAndUnHideColumn, changeBoardPropertiesPosition, isTableView, boardHeaders, changeBoardHeaderProperties, changeFieldPropertiesPostion } = useGetDashboardContextValue();
  const [fields, setFields] = useState<Array<{ backendName: string; displayName: string; value: boolean; id: number }>>([]);
  const [active, setActive] = useState<any>(null);
  const [over, setOver] = useState<any>(null);

  const openHandler = (newValue: boolean) => setOpenPopOver(newValue);

  const changeHandler = (backendName: string, newValue: boolean) => {
    if (isFieldPropertiesOpen) {
      hideAndUnHideColumn?.(backendName, newValue);
    } else {
      changeBoardHeaderProperties(backendName, newValue);
    }
  };
  const changeDragAndDropHandler = (event: any) => {
    const { active, over } = event;
    setActive(active);
    setOver(over);

  }
  const sensor = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const togglePropertiesView = () => setIsFieldPropertiesOpen(prev => !prev);

  useEffect(() => {
    const obj = setTimeout(() => {
      if (isFieldPropertiesOpen && active && over) {
        changeFieldPropertiesPostion(active.id, over.id);
      } else {
        if (active && over)
          changeBoardPropertiesPosition(active.id, over.id);
      }
    }, 200);
    return () => clearTimeout(obj);
  }, [active])
  const content = (
    <div className="w-full m-0 p-0">
      <div className="flex justify-between">
        <p className="font-semibold">{isFieldPropertiesOpen ? "Fields Properties" : "Card Properties"}</p>
        {!isTableView && (
          <p
            className={`font-bold ${styles.arrowIconCss} ${!isFieldPropertiesOpen ? styles.backIconCss : ""}`}
            onClick={togglePropertiesView}
          >
            <i className="bi bi-chevron-right" />
          </p>
        )}
      </div>
      <div className="p-1">
        <DndContext sensors={sensor} collisionDetection={closestCorners} onDragEnd={changeDragAndDropHandler}>
          <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            {fields.map(item => (
              <SortableItem key={item.id} item={item} changeHandler={changeHandler} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  useEffect(() => {
    const updatedFields = isFieldPropertiesOpen
      ? property.map((item, index) => ({
        displayName: item.displayName,
        backendName: item.backendName,
        value: item.value || false,
        id: index,
      }))
      : boardHeaders.map((item, index) => ({
        displayName: item.title,
        backendName: item.title,
        value: item.value,
        id: index,
      }));

    setFields(updatedFields);
  }, [isFieldPropertiesOpen, property, boardHeaders]);

  return (
    <Popover open={openPopOver} onOpenChange={openHandler} trigger="click" content={content} placement="top">
      <div className="flex m-1 justify-center items-center cursor-pointer">
        <p className={`mb-0 flex justify-center items-center shadow-sm rounded-lg w-8 h-8 ${styles.PropertiesCss}`}>
          <i className="text-lg bi bi-gear" />
        </p>
      </div>
    </Popover>
  );
};

export default DashboardProperties;
