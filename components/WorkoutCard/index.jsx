import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import thumbnail from "../../assets/splash_bg.jpg";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";

function WorkoutCard({ info, long = true }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("SubScreenStack", {
          screen: "Tutorial Detail",
          params: {
            tutorial_id: info?.id,
          },
        });
      }}
    >
      <Image
        source={{
          uri: info.img_url,
        }}
        style={{
          ...styles.thumbnail,
          height: long ? 250 : 150,
        }}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingRight: 5 }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.name}>{info.name}</Text>
          <Text style={styles.time}>{info.time} minutes</Text>
        </View>
        <AntDesign name={"play"} style={styles.play_icon} />
      </View>
      {info.premium && <Foundation name={"crown"} style={styles.premium} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    height: 150,
    marginBottom: 10,
    backgroundColor: "rgb(220,220,220)",
  },
  name: {
    fontWeight: "900",
    fontSize: 15,
  },
  time: {
    color: "grey",
  },
  play_icon: {
    fontSize: 20,
    marginLeft: "auto",
  },
  premium: {
    color: "#fcba03",
    fontWeight: "bold",
    position: "absolute",
    fontSize: 25,
    right: 10,
    top: 10,
  },
});

export default WorkoutCard;
