import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { useAppContext } from "../../Context";
import MealChallenge from "./MealChallenge";
import WorkoutChallenge from "./WorkoutChallenge";

const screenWidth = Dimensions.get("window").width - 80;

const DATA = [1, 2]; // Example data

function HomeDashboard() {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        <View style={styles.page}>
          <MealChallenge />
        </View>
        <View style={styles.page}>
          <WorkoutChallenge />
        </View>
      </ScrollView>
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
            onPress={() => scrollToIndex(index)}
          ></View>
        ))}
      </View>
    </View>
  );
}

export default HomeDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C66C8",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  page: {
    width: screenWidth,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 99,
    backgroundColor: "white",
    opacity: 0.3,
  },
  paginationDotActive: {
    opacity: 1,
  },
});
