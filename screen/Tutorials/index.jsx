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
import WorkoutList from "../../components/WorkoutList";
import GetTutorials from "../../api/get_tutorials";

function TutorialScreen() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    TutorialList();
  }, []);

  const TutorialList = async () => {
    try {
      setLoading(true);
      let res = await GetTutorials();
      let resJson = await res.json();
      if (res.status == 200) setClasses(resJson.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
          refreshControl={<RefreshControl onRefresh={TutorialList} />}
        >
          <WorkoutList classes={classes} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default TutorialScreen;
