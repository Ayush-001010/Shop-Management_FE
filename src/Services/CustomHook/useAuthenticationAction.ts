import APICallingServices from "../APICallingService";
import type IUserDetailsInterface from "../Interface/AuthenticationInterface";

const useAuthenticationAction = () => {

    const SignInFunc = async (value: IUserDetailsInterface) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/authentication/signIn", { ...value });
        return response;
    };

    return { SignInFunc }
};

export default useAuthenticationAction;