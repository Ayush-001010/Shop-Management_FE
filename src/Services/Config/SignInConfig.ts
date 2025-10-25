import type IFormFieldsInterface from "../Interface/FormFieldsInterface";
import * as yup from "yup";

export default class SignInConfig {
    static readonly passwordRegax = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    static readonly formConfig: IFormFieldsInterface = {
        header : "",
        sections : [
            {
                type : "single",
                fields : [
                    {
                        displayName : "User Name",
                        backendName : "userName",
                        type : "text",
                        validation : yup.string().required("User Name is required")
                    },
                    {
                        displayName : "User Password",
                        backendName : "userPassword",
                        type : "password",
                        validation : yup.string().required("User Password is required").matches(this.passwordRegax,"Password must contain at least 8 characters, including digits and special characters.")
                    }
                ]
            }
        ]
    }
}