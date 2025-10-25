import React, { useEffect, useState } from "react";
import type ICalendarItem from "./ICalendarItem";
import styles from "../CalendarDisplay.module.css";

const widthMap: Record<number, string> = {
  32: "w-32",
  64: "w-64",
  96: "w-96",
  128: "w-128",
  160: "w-160",
  192: "w-192",
  224: "w-224",
  256: "w-256",
};

const CalendarItem: React.FC<ICalendarItem> = ({ item }) => {
  const [data, setData] = useState<
    Array<{
      width: number;
      className: "normal" | "" | "beforeStart" | "didNotEnd" | "full";
      status: string;
    }>
  >([]);

  const generateArray = () => {
    const currentDate = new Date();
    const arr: Array<{
      width: number;
      className: "normal" | "" | "beforeStart" | "didNotEnd" | "full";
      status: string;
    }> = [];

    let cnt = 0;
    let isStart = false;
    let isBeforeCurrentDateStart = false;
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      let { startDate, endDate, status } = item;
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (isStart) {
        if (endDate <= currentDate) {
          isStart = false;
          cnt++;
          arr.push({
            width: cnt * 32,
            className: isBeforeCurrentDateStart ? "beforeStart" : "normal",
            status,
          });
        } else {
          cnt++;
        }
      } else {
        if (startDate <= currentDate && endDate >= currentDate) {
          cnt = 1;
          isStart = true;
          if (i === 0 && startDate < currentDate) {
            isBeforeCurrentDateStart = true;
          }
        } else {
          arr.push({
            width: 32,
            className: "",
            status: "",
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (isStart) {
      arr.push({
        width: cnt * 32,
        className: isBeforeCurrentDateStart ? "full" : "didNotEnd",
        status: item.status,
      });
    }

    setData(arr);
  };

  useEffect(() => {
    generateArray();
  }, [item]);

  return (
    <div className="flex h-15">
      <div
        className={`border-1 border-solid w-32 flex items-center justify-center ${styles.CommonBorderColor}`}
      >
        <p className={`text-xs font-semibold m-0 text-center ${styles.CalendarHeaderTextCss}`}>
          {item.title}
        </p>
      </div>

      {data.map((val, index) => {
        const widthClass = widthMap[val.width] || "w-32";
        const paddingClass =
          val.className === "normal"
            ? "p-2"
            : val.className === "beforeStart"
              ? "pl-0 pr-2 pt-2 pb-2"
              : val.className === "didNotEnd"
                ? "pl-2 pr-0 pt-2 pb-2"
                : "pl-0 pt-2 pb-2 pr-0";



        return (
          <div
            key={index}
            className={`border-1 border-solid ${widthClass} ${paddingClass} ${styles.CommonBorderColor}`}
          >
            {val.status && (
              <p
                className={`text-xs font-semibold flex justify-center items-center w-full shadow-sm ${widthClass} ${styles[val.className] || ""
                  }`}
              >
                {val.status}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarItem;
