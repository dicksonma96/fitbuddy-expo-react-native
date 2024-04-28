import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

function WorkoutChallenge() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 10 }}>
        Daily Workout Challenge
      </Text>
      <View style={styles.meal_list}>
        <WorkoutItem task={"20 Pushups"} />
        <WorkoutItem task={"2km Jogging"} />
        <WorkoutItem task={"20 Starjumps"} />
        <WorkoutItem task={"-"} />
        <WorkoutItem task={"-"} />
      </View>
    </View>
  );
}

function WorkoutItem({ task }) {
  const [status, setStatus] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setStatus((prev) => !prev)}>
      <View style={styles.workoutItem}>
        <Text style={{ flex: 1, color: "white" }}>{task}</Text>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            height: 20,
            width: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status && (
            <AntDesign
              name={"check"}
              style={{ fontSize: 15, color: "white" }}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default WorkoutChallenge;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: "100%",
  },
  meal_list: {
    padding: 15,
    backgroundColor: "#554FAB",
    borderRadius: 10,
    gap: 10,
  },
  workoutItem: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
  },
});
