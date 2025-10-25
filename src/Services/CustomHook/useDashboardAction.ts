import { useEffect, useState } from "react";
import type { IBoardFilterInterface, IBoardHeaderInterFace, IDashboardCardInterface, ITableFilterInterface, ITablePropertiesInterface } from "../Interface/DashboardInterface";
import type ITableInterface from "../Interface/DashboardInterface";
import type { IOptionsInterface } from "../Interface/CommonInterface";
import APICallingServices from "../APICallingService";
import moment from "moment";
import { useParams } from "react-router-dom";
import CommonConfig from "../Config/CommonConfig";

const useDashboardAction = (data: Array<any>, config?: Array<ITableInterface>, tablePropertiesArr?: Array<ITablePropertiesInterface>, tableFilterConfigArr?: Array<ITableFilterInterface>, boardHeaderArr?: Array<IBoardHeaderInterFace>, boardData?: Array<Array<Record<string, any>>>) => {
  const [property, setProperty] = useState<Array<ITablePropertiesInterface>>([]);
  const [boardProperty, setBoardProperty] = useState<Array<IBoardHeaderInterFace>>([]);
  const [orginalConfig, setOrginalConfig] = useState<Array<ITableInterface>>([]);
  const [orginalTableConfig, setOrginalTableConfig] = useState<Array<ITableInterface>>([]);
  const [columnConfig, setColumnConfig] = useState<Array<ITableInterface>>([]);
  const [tableFilterConfig, setTableFilterConfig] = useState<Record<string, Array<IOptionsInterface>>>({});
  const [boardValue, setBoardValue] = useState<Array<Array<any>>>([]);
  const [gridData, setGridData] = useState<Array<any>>([]);

  const genrateInitialProperties = () => {
    const arr: Array<ITablePropertiesInterface> = [];
    tablePropertiesArr?.forEach(item => {
      if (config) {
        const isFieldExist = config.find(ele => ele.backendName === item.backendName);
        if ((isFieldExist)) {
          arr.push({ ...item, value: !isFieldExist?.isHideField });
        }
      } else {
        arr.push({ ...item, value: item.value });
      }
    });
    setProperty(arr);
  };
  const hideAndUnHideColumn = (backendName: string, newValue: boolean) => {
    setProperty((prevItem: Array<ITablePropertiesInterface>) => {
      const arr: Array<string> = [];
      prevItem = prevItem.map(item => {
        if (item.backendName === backendName) item.value = newValue;
        if (!item.value) arr.push(item.backendName);
        return item;
      });
      setColumnConfig(orginalTableConfig.filter(item => !arr.includes(item.backendName)).map(ele => { return { ...ele, isHideField: false } }));
      setOrginalConfig(orginalTableConfig.filter(item => !arr.includes(item.backendName)).map(ele => { return { ...ele, isHideField: false } }));
      return prevItem;
    });
  };
  const genratedBoardOption = async (
    filterConfig: Array<IBoardFilterInterface>,
    type: string
  ): Promise<Record<string, Array<IOptionsInterface>>> => {
    const apiObj = new APICallingServices();

    const optionEntries = await Promise.all(
      filterConfig.map(async (fields) => {
        const { backendURL, backendName } = fields;

        if (backendURL && backendURL.length > 0) {
          const response = await apiObj.getDataFromBackend(backendURL, { val: type });

          if (response.success) {
            const options = response.data.map((item: any) => ({
              label: backendURL === "/inventory/option?type=RequestDate" ? moment(item).format("DD/MM/YYYY HH:MM") : item,
              value: item
            }));
            return [backendName, options] as [string, Array<IOptionsInterface>];
          }
        }

        return [backendName, []] as [string, Array<IOptionsInterface>];
      })
    );

    // Convert array of entries to object
    const option = Object.fromEntries(optionEntries);
    return option;
  };
  const genratedTableConfig = () => {
    if (!config) return;
    return;
  };
  const genrateTableFilterConfig = async () => {
    if (!tableFilterConfigArr) return;
    let options: Record<string, Array<IOptionsInterface>> = {};
    const apiObj = new APICallingServices();
    for (const item of tableFilterConfigArr) {
      let opt: Array<IOptionsInterface> = [];
      if (item.backendURL && item.backendURL.length > 0) {
        const response = await apiObj.getDataFromBackend(item.backendURL);
        if (response.success) {
          opt = response.data.map((data: any) => ({
            label: data,
            value: data
          }));
          options[item.backendName] = opt;
        }
      } else if (item.option) {
        opt = item.option;
        options[item.backendName] = opt;
      }
    }
    setTableFilterConfig(options);
  };
  const setBoardPropertyFunc = (backendName?: string, value?: boolean) => {
    if (!boardHeaderArr) return;
    const arr: Array<IBoardHeaderInterFace> = boardHeaderArr.map(item => {
      if (backendName === item.title) item.value = value || false;
      else item.value = true;
      return item;
    });
    setBoardProperty(arr);
  };
  const changeFieldPropertiesPostion = (oldIndex: number, newIndex: number) => {
    setProperty((prevState: Array<ITablePropertiesInterface>) => {
      const data = prevState[oldIndex];
      if (oldIndex < newIndex) {
        for (let index = oldIndex; index < newIndex; index++) {
          prevState[index] = prevState[index + 1];
        }
        prevState[newIndex] = data;
      } else {
        for (let index = oldIndex; index > newIndex; index--) {
          prevState[index] = prevState[index - 1];
        }
        prevState[newIndex] = data;
      }
      return [...prevState];
    });
    setOrginalConfig((prevState: Array<ITableInterface>) => {
      const data = prevState[oldIndex];
      if (oldIndex < newIndex) {
        for (let index = oldIndex; index < newIndex; index++) {
          prevState[index] = prevState[index + 1];
        }
        prevState[newIndex] = data;
      } else {
        for (let index = oldIndex; index > newIndex; index--) {
          prevState[index] = prevState[index - 1];
        }
        prevState[newIndex] = data;
      }
      return [...prevState];
    });
  };
  const changeBoardPropertiesPosition = (oldIndex: number, newIndex: number) => {
    const item1 = boardProperty[oldIndex];
    setBoardProperty((prevState: Array<IBoardHeaderInterFace>) => {
      let oldValue = prevState[newIndex];
      for (let index = newIndex - 1; index >= oldIndex; index--) {
        const val = prevState[index];
        prevState[index] = oldValue;
        oldValue = val;
      }
      prevState[newIndex] = item1;
      return [...prevState];
    })
  };
  const changeBoardCardFieldPosition = (oldIndex: number, newIndex: number, index: number) => {
    setBoardValue((prevState: Array<Array<any>>) => {
      const arr = prevState[index];
      if (oldIndex < newIndex) {
        const oldValue = arr[oldIndex];
        let prevValue = arr[newIndex];
        for (let i = newIndex - 1; i >= oldIndex; i--) {
          const val = arr[i];
          arr[i] = prevValue;
          prevValue = val;
        };
        arr[newIndex] = oldValue;
      } else {
        const oldValue = arr[newIndex];
        for (let i = newIndex; i <= oldIndex; i++) {
          if (i + 1 < arr.length) {
            const val = arr[i + 1];
            arr[i] = val;
          }
        }
        arr[oldIndex] = oldValue;
      }
      prevState[index] = arr;
      return [...prevState];
    })
  };
  const changeHandlerOfGridPosition = (currentIndex: number, newIndex: number) => {
    setGridData((prevState: Array<any>) => {
      const currentItem = prevState[currentIndex];
      if (currentIndex < newIndex) {
        for (let index = currentIndex; index + 1 < prevState.length && index < newIndex; index++) {
          prevState[index] = prevState[index + 1];
        }
        prevState[newIndex] = currentItem;
      } else {
        for (let index = currentIndex; index - 1 >= 0 && index > newIndex; index--) {
          prevState[index] = prevState[index - 1];
        }
        prevState[newIndex] = currentItem;
      }
      prevState = prevState.map((item, index) => {
        return { ...item, id: index }
      })
      return [...prevState];
    })
  };

  useEffect(() => {
    if (config) {
      setOrginalTableConfig(config);
      setColumnConfig(config);
      genratedTableConfig();
      genrateTableFilterConfig();
      setBoardPropertyFunc();
      setOrginalConfig(config);
    }
  }, [])
  useEffect(() => {
    if (tablePropertiesArr) {
      genrateInitialProperties();
    }
  }, [tablePropertiesArr])
  useEffect(() => {
    if (boardData)
      setBoardValue(boardData);
  }, [boardData])
  useEffect(() => {
    setGridData(data.map((value: any, index: number) => {
      return { ...value, id: index }
    }));
  }, [data])

  return { property, gridData, changeHandlerOfGridPosition, changeBoardCardFieldPosition, boardValue, boardProperty, orginalConfig, changeFieldPropertiesPostion, changeBoardPropertiesPosition, setBoardPropertyFunc, orginalTableConfig, hideAndUnHideColumn, columnConfig, genratedBoardOption, tableFilterConfig };
};

export const useDashboardSpecialAction = () => {
  const { id } = useParams();

  const getCardValue = async (item: IDashboardCardInterface) => {
    let { backendURL } = item;
    if (backendURL.includes("shopInventory")) {
      backendURL += `&shopID=${id}`;
    }
    const apiObj = new APICallingServices();
    const response = await apiObj.getDataFromBackend(backendURL);
    if (response.success) {
      return response.data;
    } else {
      return "";
    }
  };
  const getLastSevenDaysValueOnArr = () => {
    const currentDate = new Date();
    const arr: Array<string> = []
    for (let index = 0; index < 7; index++) {
      arr.push(`${currentDate.getDate()}'${CommonConfig.shortMonthConfig[currentDate.getMonth()]}`);
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return arr;
  };
  const getHeightOfSellTrackingBar = (data: Array<number>) => {
    const arr1 = [...data];
    arr1.sort((a, b) => a - b);
    const arr: Array<{ height: number, title: string, color: string }> = [];
    let maxi = 0;
    data.forEach((item) => {
      if (item > maxi) {
        maxi = item;
      }
    });
    if (maxi === 0) {
      data.forEach((_: any) => {
        arr.push({ height: 0, title: "No sales occurred on this date.", color: "" });
      })
    } else {
      const oneValueHeight = 340 / maxi;
      const colors: Array<string> = ["#212529", "#343a40", "#495057", "#6c757d", "#adb5bd", "#ced4da", "#dee2e6"];
      data.forEach((item) => {
        let findIndex = -1, cnt = 0;
        for (let index = 6; index >= 0 && findIndex === -1; index--) {
          if (arr1[index] === item) findIndex = cnt;
          if (index === 6 || arr1[index] !== arr1[index + 1]) cnt++;
        }
        arr.push({ height: oneValueHeight * item, title: `${item} units were sold on this date.`, color: colors[findIndex] })
      })
    }
    return arr;
  };

  return { getCardValue, getLastSevenDaysValueOnArr, getHeightOfSellTrackingBar };
}

export default useDashboardAction;