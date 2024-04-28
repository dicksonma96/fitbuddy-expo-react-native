import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MenuBtn from "../components/MenuBtn";
import DrawerMenu from "../components/DrawerMenu";
import LoginBtn from "../components/LoginBtn";
import { useAppContext } from "../Context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MainLayout({ children }) {
  const { userInfo, setUserInfo, openDrawer, setLoading } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    setShowUserMenu(false);

    Alert.alert("Signing Out", "Are you sure you want to Sign Out?", [
      { text: "Cancel" },
      {
        text: "Sign Out",
        onPress: async () => {
          setLoading(true);
          await AsyncStorage.removeItem("userinfo");
          setTimeout(() => {
            setUserInfo(null);
            setLoading(false);
          }, 1000);
        },
      },
    ]);
  };

  return (
    <>
      <View
        style={{
          ...styles.header,
          backgroundColor: openDrawer ? "rgba(0,0,0,0)" : "#F2F2F2",
          borderBottomColor: openDrawer
            ? "rgba(0,0,0,0)"
            : "rgba(100,100,100,0.1)",
        }}
      >
        <MenuBtn />

        {userInfo ? (
          <TouchableOpacity
            style={{
              ...styles.username_label,
              backgroundColor: openDrawer ? "#FF622D" : "#6C66C8",
            }}
            onPress={() => {
              setShowUserMenu(true);
            }}
          >
            <Text style={styles.username_label_text}>{userInfo?.username}</Text>
          </TouchableOpacity>
        ) : (
          <LoginBtn />
        )}
        <Modal visible={showUserMenu} animationType="fade" transparent={true}>
          <View style={styles.user_menu}>
            <TouchableOpacity
              style={styles.user_menu_option}
              onPress={() => {
                setShowUserMenu(false);

                navigation.navigate("SubScreenStack", {
                  screen: "My Profile",
                });
              }}
            >
              <Text>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.user_menu_option}
              onPress={handleSignOut}
            >
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={() => setShowUserMenu(false)}>
            <View style={styles.outside}></View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <DrawerMenu>{children}</DrawerMenu>
    </>
  );
}

export default MainLayout;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
    padding: 20,
    paddingTop: 70,
    position: "absolute",
    width: "100%",
    zIndex: 99,
    backgroundColor: "#F2F2F2",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100,100,100,0.1)",
  },
  username_label: {
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
  username_label_text: {
    color: "white",
    fontSize: 12,
  },
  outside: {
    flex: 1,
  },
  user_menu: {
    position: "absolute",
    top: 120,
    right: 20,
    backgroundColor: "white",
    borderRadius: 3,
    minWidth: 150,
    zIndex: 2,
  },
  user_menu_option: {
    padding: 10,
    width: "100%",
  },
});
