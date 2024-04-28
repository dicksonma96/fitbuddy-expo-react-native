import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetDetail from "./api/getdetail";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(null);

  useEffect(() => {
    if (showLogin == false) setLoginRedirect(null);
  }, [showLogin]);

  useEffect(() => {
    async function manageUserInfo() {
      if (userInfo) {
        await AsyncStorage.setItem("userinfo", JSON.stringify(userInfo));
      } else {
        let info = await AsyncStorage.getItem("userinfo");
        if (info) setUserInfo(JSON.parse(info));
      }
    }
    manageUserInfo();
  }, [userInfo]);

  const GetLatestDetail = async () => {
    try {
      let res = await GetDetail({ id: userInfo.id });
      let resJson = await res.json();
      if (resJson.message == "Success") {
        setUserInfo((prevState) => ({
          ...prevState,
          detail: resJson.user_detail.length ? resJson.user_detail[0] : {},
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        setOpenDrawer,
        openDrawer,
        userInfo,
        setUserInfo,
        showLogin,
        setShowLogin,
        GetLatestDetail,
        loginRedirect,
        setLoginRedirect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
