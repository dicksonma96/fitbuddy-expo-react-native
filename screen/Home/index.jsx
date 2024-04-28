import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import HomeDashboard from "../../components/HomeDashboard";
import WorkoutList from "../../components/WorkoutList";
import { useNavigation } from "@react-navigation/native";
import GetFeaturedTutorials from "../../api/get_feature_tutorials";

function HomeScreen() {
  const navigation = useNavigation();
  const [classes, setClasses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorialsList();
  }, []);

  const TutorialsList = async () => {
    try {
      setLoading(true);
      res = await GetFeaturedTutorials();
      resJson = await res.json();
      if (res.status == 200) setClasses(resJson.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
      refreshControl={<RefreshControl onRefresh={TutorialsList} />}
    >
      <Text style={styles.headline}>
        How is your {"\n"}
        <Text style={{ color: "#6C66C8" }}>HEALTH</Text> today?
      </Text>
      <HomeDashboard />

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
          marginTop: 20,
          marginBottom: 10,
          paddingHorizontal: 5,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          <Text style={{ color: "#6C66C8" }}>Latest</Text> Tutorials
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SubScreenStack", {
              screen: "Tutorial",
            });
          }}
        >
          <Text>See All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        classes && <WorkoutList classes={classes} />
      )}
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 150,
  },
});
