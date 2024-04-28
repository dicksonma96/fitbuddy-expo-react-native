import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Background from "../../assets/background.jpg";
import { Button2 } from "../../components/Button";
import RegisterApi from "../../api/register";
import { useAppContext } from "../../Context";

function SignUpScreen({ navigation }) {
  const { setLoading, setShowLogin } = useAppContext();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await RegisterApi(value);
      let resJson = await res.json();
      if (res.status != 200) {
        throw resJson.error;
      }
      if (res.status == 200) {
        setShowLogin(true);
        navigation.navigate("GeneralStack");
      }
    } catch (e) {
      Alert.alert("Sign up Failed", e, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <SafeAreaView style={style.content}>
        <KeyboardAvoidingView behavior={"padding"} style={style.inputs}>
          <Text style={{ fontSize: 25, color: "#6C66C8", fontWeight: "bold" }}>
            Sign Up
          </Text>
          <Text style={{ marginBottom: 20, marginTop: 5 }}>
            Just a few quick things to get started
          </Text>
          <TextInput
            style={style.input}
            placeholder="Username"
            value={value.username}
            onChangeText={(input) => {
              setValue((prev) => ({ ...prev, username: input }));
            }}
            blurOnSubmit={true}
          />
          <TextInput
            style={style.input}
            placeholder="Email Address"
            value={value.email}
            onChangeText={(input) => {
              setValue((prev) => ({ ...prev, email: input }));
            }}
          />
          <TextInput
            secureTextEntry={true}
            style={style.input}
            placeholder="Password"
            value={value.password}
            onChangeText={(input) => {
              setValue((prev) => ({ ...prev, password: input }));
            }}
          />
          <TextInput
            secureTextEntry={true}
            style={style.input}
            placeholder="Confirm Password"
            value={value.confirm_password}
            onChangeText={(input) => {
              setValue((prev) => ({ ...prev, confirm_password: input }));
            }}
          />
          <Button2
            text={"Sign Up"}
            style={style.signup_btn}
            onPress={handleSubmit}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Image
        source={Background}
        style={{ ...style.background, opacity: 0.5 }}
      />
    </View>
  );
}

export default SignUpScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  inputs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 3,
    color: "black",
  },
  signup_btn: {
    height: 40,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 3,
  },
});
