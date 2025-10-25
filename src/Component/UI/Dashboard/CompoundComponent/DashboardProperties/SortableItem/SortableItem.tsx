import { Switch } from "antd";
import styles from "../../CompoundComponent.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type ISortableItem from "./ISortableItem";


const SortableItem: React.FC<ISortableItem> = ({ item, changeHandler }) => {
    const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id: item.id });

    const changeHandlerFunc = (backendName: string, newValue: boolean) => {
        changeHandler(backendName, newValue);
    }

    return (
        <div
            ref={setNodeRef}
            style={{ transition, transform: CSS.Transform.toString(transform) }}
            className={`m-1 p-0 flex justify-around items-center w-full rounded-lg ${styles.headerDivCss}`}
        >
            <div className="flex items-center w-full">
                <p
                    className="flex items-center mr-1 h-full mb-0 cursor-grab"
                    {...attributes}
                    {...listeners}
                >
                    <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                    <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                </p>
                <p className="text-xs font-semibold w-full ml-1 h-full mb-0">{item.displayName}</p>
            </div>
            <p className="m-1">
                <Switch
                    checked={item.value}
                    onChange={(checked) => changeHandlerFunc(item.backendName, checked)}
                />
            </p>
        </div>

    );
};

export default SortableItem;