import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { IChatMessageInterface } from "../Interface/ChatBotInterface";
// import { useSelector } from "react-redux";
// import type { IChatBoxReduxStateInterface } from "../../Redux/ChatBox";
import type { IFormFieldInterface } from "../Interface/FormFieldsInterface";

const useChatBoxAction = () => {
    const timeTxt: string = useMemo(() => (new Date()).getHours() < 12 ? "morning" : (new Date()).getHours() < 17 ? "afternoon" : "evening", [])
    const url = useLocation().pathname;



    const genrateCreateAccountChatMessage = (): Array<IChatMessageInterface> => {

        const understandingErrors = (chats: Array<IChatMessageInterface>, _: string, currentErrors: Record<string, string>) => {

            const errorExplain = (chats: Array<IChatMessageInterface>, selectedOption: string) => {
                if (selectedOption.includes("required")) {
                    const fieldName = selectedOption.split("is")[0].trim()
                    chats.push({
                        text: `This error means the field '${fieldName}' is required. You won’t be able to proceed without filling it.`,
                        by: "Server",
                        isResponse: true
                    });
                    const newObj = { ...obj };
                    newObj.text = "Can I assist you with anything else?";
                    chats.push(newObj);
                    return chats;
                } else if (selectedOption.includes("characters long")) {
                    const fieldName = selectedOption.split("must")[0].trim()
                    const charactersLimit = selectedOption.split("least")[1].split("characters")[0].trim()
                    chats.push({
                        text: `This error means the field '${fieldName}' must contain at least ${charactersLimit} characters. You won’t be able to proceed until it’s filled correctly.`,
                        by: "Server",
                        isResponse: true
                    });
                    const newObj = { ...obj };
                    newObj.text = "Can I assist you with anything else?";
                    chats.push(newObj);
                    return chats;
                } else if (selectedOption.includes("can only contain")) {
                    const fieldName = selectedOption.split("must")[0].trim()
                    chats.push({
                        text: `This error means the '${fieldName}' field contains invalid characters. You won’t be able to proceed until it’s filled correctly.`,
                        by: "Server",
                        isResponse: true
                    });
                    const newObj = { ...obj };
                    newObj.text = "Can I assist you with anything else?";
                    chats.push(newObj);
                    return chats;
                } else {
                    chats.push({
                        text: "Hmm, I’m not able to explain this error right now — but I’m here if you need help with something else!",
                        by: "Server",
                        isResponse: true
                    });
                    const newObj = { ...obj };
                    newObj.text = "Can I assist you with anything else?";
                    chats.push(newObj);
                    return chats;
                }
            }

            if (!currentErrors || Object.keys(currentErrors).length === 0) {
                chats.push({
                    text: "There doesn’t seem to be any error at the moment, so there’s nothing I can help with right now.",
                    by: "User",
                    isResponse: true
                });
                const newObj = { ...obj };
                newObj.text = "Can I assist you with anything else?";
                chats.push(newObj);
                return chats;
            } else {
                chats.push({
                    text: "Which error would you like help understanding?",
                    by: "Server",
                    options: Object.entries(currentErrors).map((error) => {
                        return {
                            text: `${error[1]}`,
                            type: "function",
                            callbackFunc: errorExplain
                        }
                    })
                });
                return chats;
            }
        }
        const understandingFields = (chats: Array<IChatMessageInterface>, _: string, _1: Record<string, string>, currentFormField: Array<IFormFieldInterface>) => {

            const optionsSelected = (chats: Array<IChatMessageInterface>, selectOptionValue: string, _1: Record<string, string>, currentFormField: Array<IFormFieldInterface>) => {
                const field: IFormFieldInterface = currentFormField.filter(field => field.displayName === selectOptionValue)[0];
                chats.push({
                    text: `${field?.helpfulDescription || "I'm sorry, but I can't assist with that."} `,
                    by: "Server",
                    isResponse: true
                });
                const newObj = { ...obj };
                newObj.text = "Can I assist you with anything else?";
                chats.push(newObj);
                return chats;
            }

            if (currentFormField.length === 0) {
                chats.push({
                    text: "Sorry, there are no fields available at the moment. You might be on the final step — the review page.",
                    options: currentFormField.map((field) => {
                        return {
                            text: field.displayName,
                            type: "function",
                        }
                    }),
                    by: "Server",
                    isResponse:true
                });
                const newObj = { ...obj };
                newObj.text = "Can I assist you with anything else?";
                chats.push(newObj);
            } else {
                chats.push({
                    text: "Do you need help understanding the form fields?",
                    by: "User"
                });
                chats.push({
                    text: "Hey! Which field would you like help understanding?",
                    options: currentFormField.map((field) => {
                        return {
                            text: field.displayName,
                            type: "function",
                            callbackFunc: optionsSelected
                        }
                    }),
                    by: "Server"
                });
            }
            return chats;
        }

        const obj: IChatMessageInterface = {
            text: `Good ${timeTxt}! 👋 How can I assist you today?`,
            options: [{
                text: "Do you need help understanding the form fields?",
                type: "function",
                callbackFunc: understandingFields
            }, {
                text: "Do you need help understanding the error?",
                type: "function",
                callbackFunc: understandingErrors
            }],
            by: "Server"
        }
        return [obj];
    }

    const genrateChatMessage = () => {
        switch (url) {
            case "/createAccount": {
                return genrateCreateAccountChatMessage();
            }
        }
    };

    return { genrateChatMessage };
};

export default useChatBoxAction;