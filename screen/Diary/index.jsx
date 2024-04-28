import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import GetUserComplete from "../../api/get_user_complete";
import { useAppContext } from "../../Context";
import formatDate from "../../utils/formatDate";
import { useNavigation } from "@react-navigation/native";

function Diary() {
  const navigation = useNavigation();
  const { userInfo } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    UserComplete();
  }, []);

  const UserComplete = async () => {
    try {
      setLoading(true);
      let res = await GetUserComplete(userInfo.id);
      let resJson = await res.json();
      if (res.status == 200) setData(resJson.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.listing}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={<RefreshControl onRefresh={UserComplete} />}
      >
        {loading ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : data && data.length > 0 ? (
          data?.map((item, index) => (
            <View key={index} style={styles.diary_item}>
              <View>
                <Text style={styles.day}>{item.name}</Text>
                <Text style={styles.date}>
                  Completed on {formatDate(item.date)}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  gap: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#6C66C8",
                  padding: 8,
                  paddingHorizontal: 10,
                  borderRadius: 99,
                }}
                onPress={() => {
                  navigation.navigate("SubScreenStack", {
                    screen: "Tutorial Detail",
                    params: {
                      tutorial_id: item.tutorial_id,
                    },
                  });
                }}
              >
                <Text style={{ fontSize: 12, color: "white" }}>Try Again</Text>
                <AntDesign
                  name="right"
                  style={{ fontSize: 12, color: "white" }}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>You've done 0 Workout</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#6C66C8",
                padding: 10,
                width: 200,
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() =>
                navigation.navigate("SubScreenStack", {
                  screen: "Tutorial",
                })
              }
            >
              <Text style={{ color: "white" }}>Train Now!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listing: {
    padding: 20,
  },
  diary_item: {
    padding: 10,
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  day: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#6C66C8",
  },
  date: {
    fontSize: 12,
  },
});

export default Diary;
