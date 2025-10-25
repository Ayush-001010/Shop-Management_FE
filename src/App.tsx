import React, { useEffect } from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import CreateAccount from './Component/CreateAccount/CreateAccount';
import LandingPage from './Component/LandingPage/LandingPage';
import { AnimatePresence } from 'framer-motion';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import InventoryRequest from './Component/InventoryRequest/InventoryRequest';
import SignIn from './Component/SignIn/SignIn';
import Inventory from './Component/Inventory/Inventory';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/Store';
import useCommonAction from './Services/CustomHook/useCommonAction';
import { setUserDetails } from './Redux/User';
import ShopInventory from './Component/ShopInventory/ShopInventory';
import TeamChat from './Component/TeamChat/TeamChat';
import ECom from './Component/E-Com/E-Com';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { getUserDetails } = useCommonAction();
  const value = useSelector((state: any) => state.user);

  useEffect(() => {
    if (value.userEmail) {
      getUserDetails(value.userEmail).then(response => {
        if (response.success) {
          const { OrganizationDetails, ShopDetails, userDetails } = response.data;
          dispatch(setUserDetails({
            orgnizationDetails: {
              orgnizationName: OrganizationDetails.OrganizationName,
              organizationID: OrganizationDetails.ID,
            },
            ShopDetails: ShopDetails,
            userID: userDetails.ID,
            userImage: userDetails.userImageURL,
            userName: userDetails.userName,
            About: userDetails.About
          }));
        }
      });
    }
  }, [value.userEmail]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/inventory/request" element={<InventoryRequest />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Inventory/:id" element={<ShopInventory />} />
        <Route path="/TeamConnect" element={<TeamChat />} />
        <Route path="/E-Com" element={<ECom />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FunctionComponent<{}> = () => {
  return (

    <Provider store={store}>
      <HashRouter>
        <Navbar />
        <AnimatedRoutes />
      </HashRouter>
    </Provider>
  );
};

export default App;
