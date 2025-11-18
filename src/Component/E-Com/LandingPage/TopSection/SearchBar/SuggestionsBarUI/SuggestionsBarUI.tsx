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
        <p className="p-2 text-[#495057] cursor-pointer hover:bg-[#dee2e6] w-full font-medium m-0">
          {arr.map((item: string, index: number) => {
            if (item.toLowerCase().includes(searchStr.toLowerCase()))
              return (
                <span key={index} className="font-medium text-[#212529]">
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
          <div className="py-2 border-b border-[#dee2e6]">
            <p className="text-lg text-[#212529] font-normal m-0 mx-2">
              Recent
            </p>
            <div className="flex flex-wrap px-2 mt-2">
              {recentValues.map((recent, index) => (
                <p
                  key={index}
                  className="bg-[#212529] m-1 p-2 cursor-pointer rounded-full text-sm text-[#e9ecef]"
                  onClick={() => recentSelectHandler(recent)}
                >
                  {recent}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions - scrollable section */}
        <div className="max-h-60 overflow-y-auto flex flex-col items-start justify-center">
          {isLoading && (
            <p className="p-2 text-[#6c757d] font-medium m-0">Loading...</p>
          )}
          {suggestions.map((suggestion: string, index: number) =>
            genratedSuggestionString(suggestion)
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsBarUI;
