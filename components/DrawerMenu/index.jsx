import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useAppContext } from "../../Context";
import MenuBg from "../../assets/menu_bg.jpg";
import CLASS from "../../assets/icons/class_w.png";
import WORKOUT from "../../assets/icons/workout_w.png";
import DIARY from "../../assets/icons/diary_w.png";
import MEAL from "../../assets/icons/food_w.png";
import PROFILE from "../../assets/icons/profile_w.png";
import { useNavigation } from "@react-navigation/native";

export default function DrawerMenu({ children }) {
  const { openDrawer, setOpenDrawer } = useAppContext();

  return (
    <Drawer
      open={openDrawer}
      onOpen={() => setOpenDrawer(true)}
      onClose={() => setOpenDrawer(false)}
      drawerStyle={{ width: "100%" }}
      drawerType="front"
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
    >
      {children}
    </Drawer>
  );
}

function DrawerContent() {
  const navigation = useNavigation();
  const { setOpenDrawer, userInfo, setShowLogin, setLoginRedirect } =
    useAppContext();

  const handleMenuPress = () => {
    setOpenDrawer(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => {
              navigation.navigate("SubScreenStack", {
                screen: "Tutorial",
              });
              handleMenuPress();
            }}
          >
            <Image style={styles.nav_icon} source={CLASS} />
            <Text style={styles.nav_text}>TUTORIALS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_item}>
            <Image style={styles.nav_icon} source={WORKOUT} />
            <Text style={styles.nav_text}>WORKOUT PLAN</Text>
            <Text style={styles.coming_soon}>Coming Soon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => {
              if (userInfo) {
                handleMenuPress();
                navigation.navigate("SubScreenStack", {
                  screen: "Workout Diary",
                });
              } else {
                setShowLogin(true);
                setLoginRedirect({
                  stack: "SubScreenStack",
                  info: {
                    screen: "Workout Diary",
                  },
                });
              }
            }}
          >
            <Image style={styles.nav_icon} source={DIARY} />
            <Text style={styles.nav_text}>DIARY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav_item}>
            <Image style={styles.nav_icon} source={MEAL} />
            <Text style={styles.nav_text}>MEAL PLAN</Text>
            <Text style={styles.coming_soon}>Coming Soon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => {
              if (userInfo) {
                handleMenuPress();
                navigation.navigate("SubScreenStack", {
                  screen: "My Profile",
                });
              } else {
                setShowLogin(true);
                setLoginRedirect({
                  stack: "SubScreenStack",
                  info: {
                    screen: "My Profile",
                  },
                });
              }
            }}
          >
            <Image style={styles.nav_icon} source={PROFILE} />
            <Text style={styles.nav_text}>PROFILE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.date}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            2/4
          </Text>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            2024, Tuesday
          </Text>
        </View>
      </SafeAreaView>
      <Image style={styles.menu_bg} source={MenuBg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C66C8",
    alignItems: "center",
    justifyContent: "center",
  },
  menu_bg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    flex: 1,
    marginVertical: 100,
    width: "100%",
  },
  nav: {
    width: "100%",
    marginTop: "auto",
    padding: 30,
  },
  nav_item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  nav_icon: {
    width: 20,
    height: 20,
  },
  nav_text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  coming_soon: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: "white",
    fontSize: 10,
  },
  date: {
    marginTop: "auto",
    padding: 30,
  },
});
