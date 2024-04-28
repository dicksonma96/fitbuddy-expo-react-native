import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useAppContext } from "../../Context";
import Bg from "../../assets/menu_bg.jpg";
import UpdateDetail from "../../api/update_detail";

function MyProfileScreen({ navigation }) {
  const { userInfo, setLoading, GetLatestDetail } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState({
    target_weight: userInfo.detail.target_weight,
    weight: userInfo.detail.weight,
    height: userInfo.detail.height,
  });

  const UserStatus = () => {
    if (
      userInfo.detail.target_weight != null &&
      userInfo.detail.weight != null
    ) {
      let result = userInfo.detail.target_weight - userInfo.detail.weight;
      return (
        <View
          style={{
            ...styles.target_status,
            backgroundColor: result == 0 ? "#4AD917" : "#E9B530",
          }}
        >
          {result == 0 ? (
            <Text style={{ color: "white" }}>Congratulation!</Text>
          ) : (
            <Text style={{ color: "white" }}>{result}kg more to go!</Text>
          )}
        </View>
      );
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let res = await UpdateDetail({
        user_id: userInfo.id,
        ...userInfo.detail,
        ...value,
      });
      let resJson = await res.json();
      if (res.status != 200) {
        throw resJson.error;
      }
      if (res.status == 200) {
        Alert.alert("Profile Updated!", "Successfully Updated", [
          {
            text: "OK",
            onPress: async () => {
              try {
                await GetLatestDetail();
              } finally {
                setLoading(false);
              }
            },
          },
        ]);
      }
    } catch (e) {
      Alert.alert(e);
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo.detail && Object.keys(userInfo.detail).length ? (
        <SafeAreaView style={styles.detail_content}>
          <View style={styles.user_label}>
            <View style={styles.avatar}>
              <Text style={styles.initial}>{userInfo.username[0]}</Text>
            </View>
            <Text style={styles.username}>{userInfo.username}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
          <View style={styles.infos}>
            <View style={styles.target}>
              <Text style={styles.label}>Target Weight</Text>
              <View style={styles.value_container}>
                {editMode ? (
                  <TextInput
                    style={styles.input}
                    defaultValue={value.target_weight.toString()}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={5}
                    onChangeText={(text) =>
                      setValue((prev) => ({
                        ...prev,
                        target_weight: text,
                      }))
                    }
                  />
                ) : (
                  <Text style={styles.value}>
                    {userInfo.detail.target_weight}
                  </Text>
                )}

                <Text style={styles.unit}>kg</Text>
              </View>

              <UserStatus />
            </View>
            <View style={styles.info_row}>
              <View style={styles.info_item}>
                <View style={styles.value_container}>
                  {editMode ? (
                    <TextInput
                      style={styles.input}
                      defaultValue={value.weight.toString()}
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={5}
                      onChangeText={(text) =>
                        setValue((prev) => ({
                          ...prev,
                          weight: text,
                        }))
                      }
                    />
                  ) : (
                    <Text style={styles.value}>{userInfo.detail.weight}</Text>
                  )}
                  <Text style={styles.unit}>kg</Text>
                </View>
                <Text style={styles.label_small}>Current Weight</Text>
              </View>
              <View style={styles.info_item}>
                <View style={styles.value_container}>
                  {editMode ? (
                    <TextInput
                      style={styles.input}
                      defaultValue={value.height.toString()}
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={5}
                      onChangeText={(text) =>
                        setValue((prev) => ({
                          ...prev,
                          height: text,
                        }))
                      }
                    />
                  ) : (
                    <Text style={styles.value}>{userInfo.detail.height}</Text>
                  )}
                  <Text style={styles.unit}>cm</Text>
                </View>
                <Text style={styles.label_small}>Current Height</Text>
              </View>
            </View>
          </View>
          {editMode ? (
            <>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.button_text}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_cancel}
                onPress={() => {
                  setEditMode(false);
                }}
              >
                <Text style={{ ...styles.button_text, color: "white" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEditMode(true);
              }}
            >
              <Text style={styles.button_text}>Update</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.content}>
          <View style={{ width: "80%", alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 10,
                fontSize: 25,
              }}
            >
              Tell Us More About You
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              We're constantly working to tailor your workout experience to fit
              YOU! To make sure you're getting the most out of our app, we'd
              love for you to update your profile.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: "white",
              marginTop: 20,
              borderRadius: 99,
            }}
            onPress={() => {
              navigation.navigate("SubScreenStack", {
                screen: "Update Profile",
              });
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#6C66C8" }}>
              Update Now
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}

      <Image style={styles.background} source={Bg} />
    </View>
  );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C66C8",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    zIndex: 2,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  detail_content: {
    flex: 1,
    width: "100%",
    padding: 30,
    zIndex: 2,
  },
  user_label: {
    alignSelf: "center",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  initial: {
    textTransform: "uppercase",
    fontSize: 50,
    color: "#6C66C8",
  },
  username: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  email: {
    color: "white",
    fontSize: 13,
  },
  infos: {
    width: "90%",
    padding: 20,
    marginTop: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  target: {
    width: "100%",
    position: "relative",
    marginBottom: 20,
  },
  target_status: {
    position: "absolute",
    right: 0,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 99,
  },
  label: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  label_small: {
    fontSize: 12,
    color: "white",
  },
  value_container: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  input: {
    color: "white",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 25,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  value: {
    color: "white",
    fontSize: 25,
  },
  unit: {
    color: "white",
    opacity: 0.7,
    fontSize: 12,
  },
  info_row: {
    flexDirection: "row",
    marginVertical: 5,
  },
  info_item: {
    flex: 1,
  },
  button: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  button_cancel: {
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "center",
    width: "90%",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  button_text: {
    fontSize: 15,
    color: "#6C66C8",
  },
});
