import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAppContext } from "../Context";

function LoginBtn() {
  const { setShowLogin, openDrawer } = useAppContext();

  return (
    <TouchableOpacity
      style={{
        ...styles.loginBtn,
        backgroundColor: openDrawer ? "#FF622D" : "#6C66C8",
      }}
      onPress={() => setShowLogin(true)}
    >
      <Text style={styles.loginBtnText}>SIGN IN / SIGN UP</Text>
    </TouchableOpacity>
  );
}

export default LoginBtn;

const styles = StyleSheet.create({
  loginBtn: {
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
  loginBtnText: {
    color: "white",
    fontSize: 12,
  },
});
