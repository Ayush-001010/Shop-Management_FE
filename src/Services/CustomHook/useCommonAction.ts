import APICallingServices from "../APICallingService";

const useCommonAction = () => {
    const getUserDetails = async (userEmail: string) => {
        const apiObj = new APICallingServices();
        const res = await apiObj.getDataFromBackend("/authentication/getUserDetails", { userEmail });
        return res;
    };

    const isUserAlreadyLoggedIn = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/authentication/isUserAlreadyLoggedIn");
        return response;
    }

    return { getUserDetails, isUserAlreadyLoggedIn };
};

export default useCommonAction;