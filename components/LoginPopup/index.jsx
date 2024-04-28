import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAppContext } from "../../Context";
import Logo from "../../assets/logo2.png";
import { Button2 } from "../Button";
import { useNavigation } from "@react-navigation/native";
import LoginApi from "../../api/login";

function LoginPopup() {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setShowLogin, showLogin, setUserInfo, loginRedirect } =
    useAppContext();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigation();

  const handleCloseModal = () => {
    setShowLogin(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await LoginApi({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      let resJson = await res.json();
      if (res.status != 200) {
        throw resJson.error;
      }
      if (res.status == 200) {
        setShowLogin(false);
        setUserInfo(resJson.userinfo);
        if (loginRedirect) {
          navigate.navigate(loginRedirect.stack, loginRedirect.info);
        }
      }
    } catch (e) {
      Alert.alert("Sign in Failed", e, [{ text: "Close" }]);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={showLogin}
      onRequestClose={handleCloseModal}
    >
      <View style={style.container}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={style.outside}></View>
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior="padding"
          style={{
            ...style.login_popup,
          }}
        >
          <Image source={Logo} style={style.logo} />
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={style.input}
            placeholder="Username"
            ref={usernameRef}
            onChangeText={(input) => {
              usernameRef.current.value = input;
            }}
          />
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={style.input}
            secureTextEntry={true}
            placeholder="Password"
            ref={passwordRef}
            onChangeText={(input) => {
              passwordRef.current.value = input;
            }}
          />
          <TouchableOpacity
            style={{
              ...style.login_btn,
              backgroundColor: loading ? "rgb(200,200,200)" : "#FF622D",
            }}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <Text style={{ color: "white" }}>Sign In To Continue</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCloseModal();
              navigate.navigate("SubScreenStack", {
                screen: "Sign Up",
              });
            }}
          >
            <Text
              style={{ ...style.sign_up, marginBottom: isFocused ? 0 : 30 }}
            >
              Not yet a member? Sign Up Now
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default LoginPopup;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  outside: {
    flex: 1,
  },
  login_popup: {
    backgroundColor: "white",
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  logo: {
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: "#ECECEC",
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  login_btn: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#FF622D",
  },
  sign_up: {
    color: "#6C66C8",
    textDecorationLine: "underline",
  },
});
