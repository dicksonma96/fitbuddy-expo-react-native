import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppContext } from "../../Context";

const Loading = () => {
  const { loading } = useAppContext();
  return (
    loading && (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
  },
});

export default Loading;
