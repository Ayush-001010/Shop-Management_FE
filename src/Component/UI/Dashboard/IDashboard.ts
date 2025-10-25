import type ITableInterface from "../../../Services/Interface/DashboardInterface";
import type { IBoardFilterInterface, IBoardHeaderInterFace, IDashboardCardInterface, ITableFilterInterface, ITablePropertiesInterface } from "../../../Services/Interface/DashboardInterface";
import type IFormFieldsInterface from "../../../Services/Interface/FormFieldsInterface";

export default interface IDashboard {
    isGridViewNeed?: boolean;
    boardHeaderArr?: Array<IBoardHeaderInterFace>;
    boardData?: Array<Array<Record<string, any>>>;
    boardCardType?: "Inventory" | "inventoryDashboard";
    tableConfig: Array<ITableInterface>;
    tablePropertiesArr?: Array<ITablePropertiesInterface>;
    formTitle?: string;
    formFields?: IFormFieldsInterface;
    formSubmitHandler?: (value: Record<string, any>) => void;
    isCreatedForm?: boolean;
    openFormButtonText?: string;
    initialFormValue?: any;
    boardFilterConfig?: Array<IBoardFilterInterface>;
    applyHandlerOfFilterFunc?: (filterValue: Record<string, any>, type?: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => void;
    searchHandler?: (searchValue: string, type?: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => void;
    allData: Array<any>;
    tableFilterConfig?: Array<ITableFilterInterface>;
    editHandlerFunc?: (updatedValue: Record<string, any>) => Promise<{ success: boolean; message?: string }>;
    customFunc?: any;
    deleteHandlerFunc?: (id: number) => void;
    clearHandler?: (type: "New" | "In-Progress" | "Rejected" | "Hold" | "Completed" | "All") => void;
    cardConfig?: Array<IDashboardCardInterface>;
    columnCardConfig?: Array<IDashboardCardInterface>;
    sellTrackingData?: Array<number>;
    addNotes?: (Note: string) => void;
    notes?: Array<any>;
    deleteNotesHandler?: (ID: number) => void;
}