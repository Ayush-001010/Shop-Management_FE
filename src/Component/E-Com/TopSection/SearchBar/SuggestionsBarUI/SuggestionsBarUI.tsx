import React, { useCallback } from "react";
import type ISuggestionsBarUI from "./ISuggestionsBarUI";

const SuggestionsBarUI: React.FC<ISuggestionsBarUI> = ({
  isLoading,
  suggestions,
  searchStr,
  recentValues,
  recentSelectHandler,
}) => {
  const genratedSuggestionString = useCallback(
    (suggestion: string) => {
      const arr: Array<string> = suggestion.split(
        new RegExp(`(${searchStr})`, "gi")
      );
      return (
        <p className="p-2 text-[#6c757d] cursor-pointer hover:bg-[#dee2e6] w-full font-medium m-0 bg-[#e9ecef] border-b-1 mt-1">
          {arr.map((item: string, index: number) => {
            if (item.toLowerCase().includes(searchStr.toLowerCase()))
              return (
                <span key={index} className="font-semibold text-[#212529]">
                  {item}
                </span>
              );
            return <span key={index}>{item}</span>;
          })}
        </p>
      );
    },
    [searchStr]
  );

  return (
    <div className="relative z-50">
      <div className="absolute top-0 left-0 w-full bg-[#f8f9fa] shadow-lg rounded-md overflow-hidden">
        {/* Recent values - fixed section */}
        {recentValues.length > 0 && (
          <div>
            <p className="text-lg text-center text-[#495057] text-shadow-sm font-semibold m-0 m-2">
              Recent
            </p>
            <div className="flex flex-wrap">
              {recentValues.map((recent, index) => (
                <p
                  key={index}
                  className="p-2 text-[#495057] cursor-pointer hover:bg-[#dee2e6] w-full font-medium m-0 bg-[#e9ecef] border-b-1"
                  onClick={() => recentSelectHandler(recent)}
                >
                  {recent}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions - scrollable section */}
        <div className="max-h-60 overflow-y-auto flex flex-col items-start justify-center mt-1">
          {isLoading && (
            <p className="p-2 text-[#6c757d] font-medium m-0">Loading...</p>
          )}
          {!isLoading && <p className="text-lg w-full text-center text-[#495057] text-shadow-sm font-semibold m-0 m-2">
            Suggestions
          </p>}
          {suggestions.map((suggestion: string, _: number) =>
            genratedSuggestionString(suggestion)
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsBarUI;
