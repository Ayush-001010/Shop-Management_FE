import React, { useEffect, useState } from "react";
import type IChatLoader from "./IChatLoader";

const loadingText = "Loading...";

const ChatLoader: React.FC<IChatLoader> = () => {
    const [text, setText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timeout: any;

        if (visible && charIndex < loadingText.length) {
            timeout = setTimeout(() => {
                setText((prev) => prev + loadingText[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 200);
        } else if (visible && charIndex === loadingText.length) {
            timeout = setTimeout(() => {
                setVisible(false);
            }, 1500);
        } else {
            timeout = setTimeout(() => {
                setText("");
                setCharIndex(0);
                setVisible(true);
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, visible]);

    return (
        <div className="flex justify-center mt-1">
            <p className={`bg-[#6c757d] p-2 rounded-4xl text-[#f8f9fa] shadow-sm transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                {text}
            </p>
        </div>
    );
};

export default ChatLoader;
