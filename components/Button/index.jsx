import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export function Button1({
  onPress,
  text = "Button",
  fontColor = "white",
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, styles.btn1, style]}
    >
      <Text style={{ color: fontColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

export function Button2({
  onPress,
  text = "Button",
  fontColor = "white",
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, styles.btn2, style]}
    >
      <Text style={{ color: fontColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 5,
    paddingHorizontal: 10,
  },
  btn1: {
    borderRadius: 99,
    backgroundColor: "#999DDC",
  },
  btn2: {
    color: "white",
    backgroundColor: "#FF622D",
  },
});
