import React, { createContext, useContext, useState, type ReactNode } from "react";
import type IDashboard from "./IDashboard";
import DashboardToggle from "./CompoundComponent/DashboardToggle/DashboardToggle";
import Board from "./Board/Board";
import DashboardProperties from "./CompoundComponent/DashboardProperties/DashboardProperties";
import type { IBigTextModalInterface, IBoardFilterInterface, IBoardHeaderInterFace, IClearButtonAppliedInterface, IDashboardCardInterface, IStatusStepsModalInterface, ITableFilterInterface, ITablePropertiesInterface } from "../../../Services/Interface/DashboardInterface";
import useDashboardAction from "../../../Services/CustomHook/useDashboardAction";
import type IFormFieldsInterface from "../../../Services/Interface/FormFieldsInterface";
import TableUI from "./Table/TableUI";
import type ITableInterface from "../../../Services/Interface/DashboardInterface";
import TableQuerying from "./Table/TableQuerying/TableQuerying";
import type { IOptionsInterface } from "../../../Services/Interface/CommonInterface";
import styles from "./Dashboard.module.css";
import DashboardForm from "./CompoundComponent/Form/DashboardForm";
import EditForm from "./CompoundComponent/EditForm/EditForm";
import TableFilter from "./Table/TableFilter/TableFilter";
import TableSearch from "./Table/TableSearch/TableSearch";
import BigTextDisplay from "./Table/TableUIComponent/BigTextDisplay/BigTextDisplay";
import StatusStepsDisplay from "./Table/TableUIComponent/StatusStepsDisplay/StatusStepsDisplay";
import GridDashboardToogle from "./CompoundComponent/DashboardToggle/GridDashboardToogle/GridDashboardToogle";
import Grid from "./Grid/Grid";
import RowByRowCards from "./Card/RowByRowCards/RowByRowCards";
import ColumnByColumnCards from "./Card/ColumnByColumnCards/ColumnByColumnCards";
import SellTracking from "./Analytics/SellTracking/SellTracking";
import Notes from "./Notes/Notes";

interface IDashboardContext {
    property: Array<ITablePropertiesInterface>;
    hideAndUnHideColumn?: (backendName: string, newValue: boolean) => void;
    formTitle?: string;
    formFields?: IFormFieldsInterface;
    isCreatedForm?: boolean;
    openFormButtonText?: string;
    formSubmitHandler?: (value: Record<string, any>) => void;
    initialFormValue?: any;
    boardFilterConfig?: Array<IBoardFilterInterface>;
    applyHandlerOfFilterFunc?: (filterValue: Record<string, any>, type: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => void;
    searchHandler?: (searchValue: string, type: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => void;
    changeView: (type: "table" | "board" | "grid") => void;
    isTableView: boolean;
    data: Array<any>;
    config: Array<ITableInterface>;
    tableFilterConfig?: Array<ITableFilterInterface>;
    filterOptions?: Record<string, Array<IOptionsInterface>>;
    boardHeaders: Array<IBoardHeaderInterFace>;
    changeBoardHeaderProperties: (title: string, value: boolean) => void;
    changeFieldPropertiesPostion: (oldIndex: number, newIndex: number) => void;
    changeBoardPropertiesPosition: (oldIndex: number, newIndex: number) => void;
    openEditForm: boolean;
    openEditFormHandler: () => void;
    closeEditForm: (decision: "just-close" | "update", newValue?: Record<string, any>) => void;
    editFormFields?: IFormFieldsInterface;
    editFormInitialValues: Record<string, any>;
    setEditFormInitialValuesHandler: (value: Record<string, any>) => void;
    setEditFormFieldsHandler: (fields: IFormFieldsInterface) => void;
    editFormTitle: string;
    setEditFormTitleHandler: (title: string) => void;
    customFunc?: any;
    setTableQueryTypeFunc: (type: "filter" | "search" | null) => void;
    deleteHandlerFunc?: (id: number) => void;
    orginalConfig: Array<ITableInterface>;
    openBigTextModal: IBigTextModalInterface;
    changeHandlerBigTextModal: (val: IBigTextModalInterface) => void;
    openStatusStepModal: IStatusStepsModalInterface;
    changeHandlerStatusStepHandler: (val: IStatusStepsModalInterface) => void;
    clearHandler?: (type: "New" | "In-Progress" | "Rejected" | "Hold" | "Completed" | "All") => void;
    clearButtonApplied: IClearButtonAppliedInterface;
    changeBoardCardFieldPosition: (oldIndex: number, newIndex: number, index: number) => void;
    boardCardType?: "Inventory" | "inventoryDashboard";
    columnConfig: Array<ITableInterface>;
    gridData: Array<any>;
    changeHandlerOfGridPosition: (currentIndex: number, newIndex: number) => void;
    cardConfig?: Array<IDashboardCardInterface>;
    columnCardConfig?: Array<IDashboardCardInterface>;
    sellTrackingData?: Array<number>;
    addNotes?: (Note: string) => void;
    notes?: Array<any>;
    deleteNotesHandler?: (ID: number) => void;
    orginalTableConfig: Array<ITableInterface>;
}

const DashboardContext = createContext<IDashboardContext | undefined>(undefined);

export const useGetDashboardContextValue = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("Error On Getting Context");
    }
    return context;
}

interface DashboardComponent extends React.FC<IDashboard & { children: ReactNode }> {
    Toggle: typeof DashboardToggle;
    Properties: typeof DashboardProperties;
    Form: typeof DashboardForm;
    TableQuerying: typeof TableQuerying;
    EditForm: typeof EditForm;
    BigTextModal: typeof BigTextDisplay;
    StatusSteps: typeof StatusStepsDisplay;
    GridDashboardToogle: typeof GridDashboardToogle;
    RowByRowCards: typeof RowByRowCards;
    ColumnByColumnCards: typeof ColumnByColumnCards;
    SellTracking: typeof SellTracking;
    Notes: typeof Notes;
}

const Dashboard: DashboardComponent = ({ children, deleteNotesHandler, notes, addNotes, columnCardConfig, sellTrackingData, cardConfig, clearHandler, deleteHandlerFunc, customFunc, editHandlerFunc, tableFilterConfig, allData: data, boardHeaderArr, boardFilterConfig, boardData, boardCardType, tableConfig, openFormButtonText, tablePropertiesArr, formFields, formTitle, isCreatedForm, formSubmitHandler, applyHandlerOfFilterFunc, initialFormValue, searchHandler, isGridViewNeed }) => {
    const { property, columnConfig, changeHandlerOfGridPosition, changeBoardCardFieldPosition, changeBoardPropertiesPosition, orginalConfig, gridData, changeFieldPropertiesPostion, hideAndUnHideColumn, setBoardPropertyFunc, boardProperty, tableFilterConfig: filterOptions, boardValue, orginalTableConfig } = useDashboardAction(data, tableConfig, tablePropertiesArr, tableFilterConfig, boardHeaderArr, boardData);
    const [isTableView, setIsTableView] = useState<boolean>(true);
    const [openEditForm, setOpenEditForm] = useState<boolean>(false);
    const [editFormFields, setEditFormFields] = useState<IFormFieldsInterface>();
    const [editFormInitialValues, setEditFormInitialValues] = useState<Record<string, any>>({});
    const [editFormTitle, setEditFormTitle] = useState<string>("");
    const [tableQueryType, setTableQueryType] = useState<"filter" | "search" | null>(null);
    const [openBigTextModal, setOpenBigTextModal] = useState<IBigTextModalInterface>({ open: false, text: "", propertyName: "" });
    const [openStatusStepModal, setOpenStatusStepModal] = useState<IStatusStepsModalInterface>({ open: false, items: [], val: 0 });
    const [clearButtonApplied, setClearButtonApplied] = useState<IClearButtonAppliedInterface>({ type: "" })

    const changeHandlerStatusStepHandler = (val: IStatusStepsModalInterface) => {
        setOpenStatusStepModal(val);
    }
    const changeHandlerBigTextModal = (val: IBigTextModalInterface) => {
        setOpenBigTextModal(val);
    }
    const setTableQueryTypeFunc = (type: "filter" | "search" | null) => {
        setTableQueryType(type);
    }
    const setEditFormTitleHandler = (title: string) => {
        setEditFormTitle(title);
    }
    const setEditFormInitialValuesHandler = (value: Record<string, any>) => {
        setEditFormInitialValues(value);
    }
    const setEditFormFieldsHandler = (fields: IFormFieldsInterface) => {
        setEditFormFields(fields);
    }
    const closeEditForm = (decision: "just-close" | "update", newValue?: Record<string, any>) => {
        setOpenEditForm(false);
        if (decision === "update" && editHandlerFunc) {
            editHandlerFunc(newValue || {});
        }
    }
    const openEditFormHandler = () => setOpenEditForm(true);
    const changeView = (type: "table" | "board" | "grid") => {
        setIsTableView(type === "table");
    }
    const clearHandlerFunc = (type: "New" | "In-Progress" | "Rejected" | "Hold" | "Completed" | "All") => {
        setClearButtonApplied({ type });
        setTableQueryTypeFunc(null);
        if (clearHandler) {
            clearHandler(type);
        }
    }

    return (
        <DashboardContext.Provider value={{ property, orginalTableConfig, deleteNotesHandler, notes, addNotes, columnCardConfig, sellTrackingData, cardConfig, changeHandlerOfGridPosition, gridData, changeBoardCardFieldPosition, clearButtonApplied, clearHandler: clearHandlerFunc, changeHandlerStatusStepHandler, openStatusStepModal, openBigTextModal, changeHandlerBigTextModal, changeBoardPropertiesPosition, orginalConfig, deleteHandlerFunc, setTableQueryTypeFunc, customFunc, setEditFormTitleHandler, editFormTitle, setEditFormInitialValuesHandler, editFormInitialValues, editFormFields, setEditFormFieldsHandler, openEditFormHandler, openEditForm, closeEditForm, changeFieldPropertiesPostion, boardHeaders: boardProperty, changeBoardHeaderProperties: setBoardPropertyFunc, filterOptions, tableFilterConfig, config: tableConfig, data, changeView, isTableView, boardFilterConfig, hideAndUnHideColumn, initialFormValue, formFields, formTitle, isCreatedForm, openFormButtonText, formSubmitHandler, applyHandlerOfFilterFunc, searchHandler, boardCardType, columnConfig }}>
            <div className="m-4">
                {children}
                <hr />
                {(tableQueryType === "filter" && isTableView) && <TableFilter />}
                {(tableQueryType === "search" && isTableView) && <TableSearch />}
                <div className={`mt-1 shadow-lg rounded-lg p-2 ${styles.dashboardCss}`}>
                    {(!isTableView && !isGridViewNeed) && <Board data={boardValue || []} boardCardType={boardCardType as "Inventory"} tableConfig={columnConfig} />}
                    {isTableView && <TableUI />}
                    {(!isTableView && isGridViewNeed) && <Grid />}
                </div>
            </div>
        </DashboardContext.Provider>
    )
};

Dashboard.Toggle = DashboardToggle;
Dashboard.Properties = DashboardProperties;
Dashboard.Form = DashboardForm;
Dashboard.TableQuerying = TableQuerying;
Dashboard.EditForm = EditForm;
Dashboard.BigTextModal = BigTextDisplay;
Dashboard.StatusSteps = StatusStepsDisplay;
Dashboard.GridDashboardToogle = GridDashboardToogle;
Dashboard.RowByRowCards = RowByRowCards;
Dashboard.ColumnByColumnCards = ColumnByColumnCards;
Dashboard.SellTracking = SellTracking;
Dashboard.Notes = Notes;

export default Dashboard;