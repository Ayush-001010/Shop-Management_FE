import APICallingServices from "../APICallingService";

const useCommonAction = () => {
    const getUserDetails = async (userEmail: string) => {
        const apiObj = new APICallingServices();
        const res = await apiObj.getDataFromBackend("/authentication/getUserDetails", { userEmail });
        return res;
    };

    return { getUserDetails };
};

export default useCommonAction;