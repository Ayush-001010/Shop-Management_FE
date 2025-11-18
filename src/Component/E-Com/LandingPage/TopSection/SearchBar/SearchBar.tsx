import React, { useCallback, useEffect, useState } from "react";
import type ISearchBar from "./ISearchBar";
import { motion } from 'framer-motion';
import { useGetEcomContext } from "../../../E-Com";
import SuggestionsBarUI from "./SuggestionsBarUI/SuggestionsBarUI";

const SearchBar: React.FC<ISearchBar> = () => {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>("");
    const { getSearchItems } = useGetEcomContext();
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recentSearchStr, setRecentSearchStr] = useState<Array<string>>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);


    const isSearchChangeHandler = () => {
        setIsSearch((prevState) => {
            const val = !prevState;
            if (!val) {
                setSuggestions([]);
            }
            return val;
        });
    }
    const onChangeHandler = (e: any) => setSearchStr(e.target.value);
    const onBlurHandler = () => setIsFocused(false);
    const onFocusedHandler = () => setIsFocused(true);
    const searchItemsHandler = useCallback(async (searchValue: string) => {
        // setRecentSearchStr((prevState) => {
        //     let arr = prevState.slice(0, 4);
        //     if (!arr.includes(searchValue.trim()))
        //         return [searchValue, ...arr];
        //     else
        //         return [...prevState];
        // });
        setIsLoading(true);
        const val = localStorage.getItem(searchValue);
        if (!val) {
            const res = await getSearchItems(searchValue);
            if (res.success) {
                localStorage.setItem(searchValue, JSON.stringify(res.data));
                setSuggestions(res.data);
            }
        } else {
            setSuggestions(JSON.parse(val));
        }
        setIsLoading(false);
    }, []);
    const recentSelectHandler = (value: string) => {
        setSearchStr(value);
    };

    useEffect(() => {
        const obj = setTimeout(() => {
            if (searchStr.length > 0) {
                searchItemsHandler(searchStr);
            } else {
                setSuggestions([]);
            }
        }, 1000);
        return () => clearTimeout(obj);
    }, [searchStr]);

    return (
        <div className="mx-1 w-full">
            {!isSearch && (
                <div className="flex justify-end">
                    <p onClick={isSearchChangeHandler} className="flex justify-center  items-center w-10 h-10 m-0 rounded-lg bg-[#023e8a] text-white shadow-xl cursor-pointer">
                        <i className="bi bi-search" />
                    </p>
                </div>
            )}
            {isSearch && (
                <div className="flex justify-end w-full items-center">
                    <div className="mx-1 w-full ">
                        <motion.div initial={{ opacity: 0, translateX: 20 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 20 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                            <input className="w-full border-1 h-10 rounded-lg border-[#ced4da] p-1" value={searchStr} onBlur={onBlurHandler} onFocus={onFocusedHandler} onChange={onChangeHandler} placeholder="Type the product you're looking for…"/>
                            {(suggestions.length > 0 || isLoading || (isFocused && recentSearchStr.length > 0)) && <SuggestionsBarUI suggestions={suggestions} isLoading={isLoading} searchStr={searchStr} recentValues={recentSearchStr} recentSelectHandler={recentSelectHandler} />}
                        </motion.div>
                    </div>
                    <div className="mx-2">
                        <p onClick={isSearchChangeHandler} className="flex justify-center items-center w-10 h-10 m-0 rounded-lg bg-[#9d0208] text-white shadow-lg cursor-pointer">
                            <i className="bi bi-x-lg"></i>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
};

export default SearchBar;