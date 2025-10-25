import * as React from 'react';
import type ILandingPage from './ILandingPage';
import { Button } from 'antd';
import styles from './LandingPage.module.css';
import LandingPageConfig from '../../Services/Config/LandingPageConfig';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingImage from './LandingImage/LandingImage';

const LandingPage: React.FunctionComponent<ILandingPage> = () => {
    return (
        <div className='flex'>
            <div className='w-95 mt-30 ml-10'>
                <div style={{ overflow: "hidden" }}>
                    <motion.div initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <p className={`m-0 font-normal ${styles.tryItNowTextCSS}`}>{LandingPageConfig.tryItNowText}</p>
                    </motion.div>
                </div>
                <div className='mt-10'>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 1 }}>
                        <p className={`m-0 font-semibold text-6xl ${styles.titleCSS}`}>{LandingPageConfig.title}</p>
                    </motion.div>
                </div>

                <div className='mt-10'>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 2 }}>
                        <p>{LandingPageConfig.description}</p>
                    </motion.div>
                </div>
                <div className='mt-5'>
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: "easeOut", delay: 3 }}>
                        <div className='flex justify-start'>
                            <Link to="/createAccount">
                                <Button className={`font-normal ${styles.ButtonCss}`}>
                                    {LandingPageConfig.buttonText1}
                                </Button>
                            </Link>
                            <p className={`mb-0 flex justify-center items-center mx-2 ${styles.OrCSS}`}>-or-</p>
                            <Link to="/signIn">
                                <Button className={`w-30  ${styles.ButtonCss}`}>
                                    {LandingPageConfig.buttonText2}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div>
                <LandingImage />
            </div>
        </div>
    )
}

export default LandingPage;



{/* <motion.div initial={{ opacity: 1 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.6 }}>
</motion.div> */}

{/* <div className="container mx-auto py-16 mt-10">
                <h1 className="text-center text-4xl font-bold">{LandingPageConfig.title}</h1>
                <p className="text-center text-lg mt-10">{LandingPageConfig.description}</p>
                <div className="container mx-auto flex flex-row py-10  justify-center">
                    <Link to="/createAccount">
                        <Button className={`mx-3 ${styles.ButtonCss}`}>
                            {LandingPageConfig.buttonText1}
                        </Button>
                    </Link>
                    <p className="text-lg mx-5 my-1 font-semibold text-center flex flex-col justifu-center">OR</p>
                    <Link to="/signIn">
                        <Button className={`w-30 mx-3 ${styles.ButtonCss}`}>
                            {LandingPageConfig.buttonText2}
                        </Button>
                    </Link>
                </div>
            </div> */}