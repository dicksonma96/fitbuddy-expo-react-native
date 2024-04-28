import { StatusBar } from "expo-status-bar";
import { AppContextProvider } from "./Context";
import Navigator from "./Navigator";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <AppContextProvider>
      <Navigator />
    </AppContextProvider>
  );
}
