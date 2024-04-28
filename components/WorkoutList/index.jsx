import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import WorkoutCard from "../WorkoutCard";
import getEvenItems from "../../utils/getEvenItems";
import getOddItems from "../../utils/getOddItems";

function WorkoutList({ classes }) {
  return (
    <View style={styles.container}>
      <View style={styles.class_list}>
        <View style={styles.class_col}>
          {getEvenItems(classes).map((item, index) => {
            let img_type = index % 2 == 0;
            return <WorkoutCard info={item} key={index} long={!img_type} />;
          })}
        </View>
        <View style={styles.class_col}>
          {getOddItems(classes).map((item, index) => {
            let img_type = index % 2 == 0;
            return <WorkoutCard info={item} key={index} long={img_type} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  class_list: {
    flexDirection: "row",
    gap: 15,
  },
  class_col: {
    flex: 1,
    width: "100%",
  },
});

export default WorkoutList;
