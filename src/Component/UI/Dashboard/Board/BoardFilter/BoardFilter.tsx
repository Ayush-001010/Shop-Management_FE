import React, { useEffect, useState } from "react";
import type IBoardFilter from "./IBoardFilter";
import { useGetDashboardContextValue } from "../../Dashboard";
import useDashboardAction from "../../../../../Services/CustomHook/useDashboardAction";
import type { IOptionsInterface } from "../../../../../Services/Interface/CommonInterface";
import type { IBoardFilterInterface } from "../../../../../Services/Interface/DashboardInterface";
import { Button, Select } from "antd";
import styles from "../Board.module.css";

const BoardFilter: React.FC<IBoardFilter> = ({ header, isOpenFunc }) => {
    const contextVal = useGetDashboardContextValue();
    const filterConfig = contextVal?.boardFilterConfig;
    const applyHandlerOfBoardFilterFunc = contextVal?.applyHandlerOfFilterFunc;
    const { genratedBoardOption } = useDashboardAction([]);
    const [options, setOptions] = useState<Record<string, Array<IOptionsInterface>>>({});
    const [value, setValue] = useState<Record<string, any>>({});

    const changeHandler = (newValue: string, backendName: string) => {
        setValue((prevState) => {
            return {
                ...prevState,
                [backendName]: newValue
            }
        });
    }
    const applyHandler = () => {
        if (applyHandlerOfBoardFilterFunc) {
            applyHandlerOfBoardFilterFunc(value, "New");
        }
    }
    const genratedType = () => {
        switch (header) {
            case "New": return "New";
            default: return "";
        }
    }

    useEffect(() => {
        if (filterConfig) {
            const type: string = genratedType();
            genratedBoardOption(filterConfig, type).then((response) => {
                setOptions(response);
            });
        }
    }, [filterConfig])
    return (
        <div>
            <Button className={`w-full m-1 font-semibold ${styles.boardPopOverButtonCss}`} onClick={() => isOpenFunc(null)}>Back</Button>
            {filterConfig?.map((fields: IBoardFilterInterface) => {
                const { displayName, backendName } = fields;
                return (
                    <div className="flex flex-col m-1">
                        <label className={`text-sm ${styles.filterLabelCss}`}>{displayName}</label>
                        <Select className="w-full" options={options[backendName]} onChange={(newValue) => changeHandler(newValue, backendName)} />
                    </div>
                )
            })}
            <div>
                <Button className={`w-full m-1 font-semibold ${styles.boardPopOverApplyButtonCss}`} onClick={applyHandler}>Apply</Button>
            </div>
        </div>
    )
};

export default BoardFilter;