import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useAppContext } from "../Context";

function MenuBtn() {
  const { openDrawer, setOpenDrawer } = useAppContext();

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleDrawer}>
      <View style={styles.menubtn}>
        <View
          style={{
            ...styles.line,
            width: openDrawer ? "40%" : "100%",
            backgroundColor: openDrawer ? "white" : "black",
          }}
        ></View>
        <View
          style={{
            ...styles.line,
            width: "75%",
            backgroundColor: openDrawer ? "white" : "black",
          }}
        ></View>
        <View
          style={{
            ...styles.line,
            width: openDrawer ? "100%" : "40%",
            backgroundColor: openDrawer ? "white" : "black",
          }}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default MenuBtn;

const styles = StyleSheet.create({
  menubtn: {
    alignItems: "flex-start",
    height: 30,
    width: 30,
    gap: 4,
    justifyContent: "center",
  },
  line: {
    height: 4,
    width: "100%",
    backgroundColor: "black",
  },
});
