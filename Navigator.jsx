import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home";
import SignUpScreen from "./screen/SignUp";
import MyProfileScreen from "./screen/MyProfile";
import UpdateProfileScreen from "./screen/UpdateProfile";
import MainLayout from "./layout/main";
import LoginPopup from "./components/LoginPopup";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Loading from "./components/Loading";
import SplashScreen from "./screen/SplashScreen";
import TutorialScreen from "./screen/Tutorials";
import TutorialDetailScreen from "./screen/TutorialDetail";
import Diary from "./screen/Diary";

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"SplashScreen"}
      >
        <Stack.Screen component={SplashScreen} name="SplashScreen" />
        <Stack.Screen component={GeneralStackScreen} name="GeneralStack" />
        <Stack.Screen component={SubScreenStackScreen} name="SubScreenStack" />
      </Stack.Navigator>
      <Loading />
      <LoginPopup />
    </NavigationContainer>
  );
}

const GeneralStack = createNativeStackNavigator();

function GeneralStackScreen() {
  return (
    <MainLayout>
      <GeneralStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <GeneralStack.Screen name="Home" component={HomeScreen} />
      </GeneralStack.Navigator>
    </MainLayout>
  );
}

const SubScreenStack = createNativeStackNavigator();

function SubScreenStackScreen() {
  return (
    <SubScreenStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerLeft: () => <BackBtn navigation={navigation} />,
      })}
    >
      <SubScreenStack.Screen component={SignUpScreen} name="Sign Up" />
      <SubScreenStack.Screen
        component={MyProfileScreen}
        name="My Profile"
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => <BackBtn color={"white"} navigation={navigation} />,
        })}
      />
      <SubScreenStack.Screen
        component={UpdateProfileScreen}
        name="Update Profile"
      />
      <SubScreenStack.Screen component={TutorialScreen} name="Tutorial" />
      <SubScreenStack.Screen
        component={TutorialDetailScreen}
        name="Tutorial Detail"
      />
      <SubScreenStack.Screen component={Diary} name="Workout Diary" />
    </SubScreenStack.Navigator>
  );
}

const BackBtn = ({ navigation, color = "black" }) => {
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <AntDesign
        name={"left"}
        style={{ fontSize: 20, fontWeight: "bold", color: color }}
      />
    </TouchableOpacity>
  );
};

export default Navigator;
