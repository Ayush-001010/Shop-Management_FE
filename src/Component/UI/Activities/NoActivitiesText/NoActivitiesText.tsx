import React from "react";
import type INoActivitiesText from "./INoActivitiesText";
import styles from "../Activities.module.css";
import { motion } from 'framer-motion';

const NoActivitiesText: React.FC<INoActivitiesText> = () => {
    return (
        <div className="flex justify-center items-center w-full h-full m-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <p className={`font-semibold text-sm m-0 text-shadow-sm ${styles.NoDataTextCss}`}>No activity recorded in the past 7 days.</p>
            </motion.div >
        </div>
    )
};

export default NoActivitiesText;