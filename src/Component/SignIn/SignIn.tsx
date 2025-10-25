import React, { useState } from "react";
import type ISignIn from "./ISignIn";
import { motion } from 'framer-motion';
import styles from "./SignIn.module.css";
import { Button, Input } from "antd";
import type IUserDetailsInterface from "../../Services/Interface/AuthenticationInterface";
import useAuthenticationAction from "../../Services/CustomHook/useAuthenticationAction";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../Redux/User";



const SignIn: React.FC<ISignIn> = () => {
    const [value, setValue] = useState<IUserDetailsInterface>({ userEmail: "", password: "" });
    const { SignInFunc } = useAuthenticationAction();
    const dispatch = useDispatch();

    const submitHandler = async () => {
        const response = await SignInFunc(value);
        if (response.success) {
            const { data } = response;
            dispatch(setUserEmail({ userEmail: value.userEmail, isLogIn: true, isAdmin: data.isAdmin }));
            window.location.href = "#/Home";
        }
    }
    const changeHandler = (newValue: string, backendName: keyof IUserDetailsInterface) => {
        setValue((prevState) => {
            return { ...prevState, [backendName]: newValue }
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="text-center mt-10">
                    <h1 className={`text-4xl font-bold mb-2 ${styles.headerCss}`}>Welcome Back !!</h1>
                    <p className={`text-base ${styles.welcomeBackTextCss}`}>
                        We're thrilled to welcome you to our platform, where you'll find all the tools you need to manage your shop efficiently and effortlessly.
                    </p>
                </div>

                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mt-12 hover:shadow-xl transition duration-300">
                    <form className={styles.formContainer}>
                        <div className="space-y-6">
                            <div>
                                <label className={styles.label}>User Email</label>
                                <Input className={styles.input} placeholder="Enter your email" onChange={({ target }) => changeHandler(target.value, "userEmail")} />
                            </div>
                            <div>
                                <label className={styles.label}>Password</label>
                                <Input.Password className={styles.input} placeholder="Enter your password" onChange={({ target }) => changeHandler(target.value, "password")} />
                            </div>
                            <div>
                                <Button onClick={submitHandler} className={styles.button}>Sign In</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
};

export default SignIn;