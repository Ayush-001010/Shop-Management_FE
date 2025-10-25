import React from "react";
import type ILandingImage from "./ILandingImage";
import Image from "../../../Image/Untitleddesign.png";
import Image1 from "../../../Image/supply_5.jpg";
import { motion } from 'framer-motion';
import styles from "../LandingPage.module.css";
import LandingPageConfig from "../../../Services/Config/LandingPageConfig";


const LandingImage: React.FC<ILandingImage> = () => {
    return (
        <div className="mt-20 ml-30">
            <div className="flex justify-start ">
                <motion.div className="w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 5, ease: "easeOut" }}>
                    <div className="rounded-4xl overflow-hidden  w-full h-80 shadow-sm">
                        <img src={Image} alt="Landing Image" />
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 , y:-30 }} animate={{ opacity: 1 , y:0}} transition={{ duration: 2, delay: 10, ease: "easeOut" }}>
                    <div className={`${styles.InventoryManagementDivCSS} ml-10  w-60 rounded-3xl h-84 overflow-hidden shadow-md flex justify-center flex-col items-center`}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 12, ease: "easeOut" }}>
                            <i className={`bi bi-cart text-5xl ${styles.InventoryManagementIconCSS}`} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 13, ease: "easeOut" }}>
                            <p className={`font-normal mt-1 ${styles.InventoryManagementTextCSS} m-0`}>{LandingPageConfig.SaleTrackingText}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <div className="mt-1 flex">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 6, ease: "easeOut" }}>
                    <div className={`${styles.InventoryManagementDivCSS} ml-10 w-60 rounded-3xl h-84 overflow-hidden shadow-md flex justify-center flex-col items-center`}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 7, ease: "easeOut" }}>
                            <i className={`bi bi-box text-5xl ${styles.InventoryManagementIconCSS}`} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 8, ease: "easeOut" }}>
                            <p className={`font-normal mt-1 ${styles.InventoryManagementTextCSS}`}>{LandingPageConfig.InventoryManagementText}</p>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 9, ease: "easeOut" }}>
                    <div className="rounded-4xl overflow-hidden ml-10 w-120 h-84 shadow-md">
                        <img src={Image1} alt="Landing Image" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
};

export default LandingImage;