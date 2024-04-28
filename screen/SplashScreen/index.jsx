import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import Logo from "../../assets/logo_white.png";
import background from "../../assets/splash_bg.jpg";
import { useAppContext } from "../../Context";
import { useNavigation } from "@react-navigation/native";

function SplashScreen() {
  const { setShowLogin, userInfo, setLoginRedirect } = useAppContext();
  const [loginLoading, setLoginLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (userInfo) {
      setLoginLoading(true);
      setTimeout(() => {
        navigation.replace("GeneralStack");
      }, 2000);
    } else {
      setLoginLoading(false);
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Image source={Logo} style={styles.logo} />
        {loginLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.join_btn}
              onPress={() => {
                navigation.navigate("SubScreenStack", {
                  screen: "Sign Up",
                });
              }}
            >
              <Text style={styles.join_btn_text}>Join Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowLogin(true);
              }}
            >
              <Text style={{ fontSize: 15, color: "white", marginBottom: 15 }}>
                Already a member? Sign in here
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("GeneralStack");
              }}
            >
              <Text style={styles.join_btn_text}>Continue as Guest</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
      <Image source={background} style={styles.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C66C8",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    width: "80%",
    alignSelf: "center",
  },
  logo: {
    width: 200,
    height: 120,
    zIndex: 2,
    marginBottom: 50,
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  join_btn: {
    width: "100%",
    backgroundColor: "#6C66C8",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  join_btn_text: {
    color: "white",
    fontSize: 15,
  },
});

export default SplashScreen;
