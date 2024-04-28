import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../Context";
import UpdateDetail from "../../api/update_detail";

function UpdateProfileScreen() {
  const { setLoading, userInfo, GetLatestDetail } = useAppContext();
  const [step, setStep] = useState(1);
  const [value, setValue] = useState({
    age: 20,
    gender: "m",
    height: 170,
    weight: 60,
    target_weight: 60,
    exercise_freq: 0,
    plank_last: 0,
    home_equip: 0,
  });
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     // Show the alert
  //     Alert.alert(
  //       "Leave Screen?",
  //       "Are you sure you want to leave this screen?",
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //           onPress: () => {},
  //         },
  //         {
  //           text: "Leave",
  //           onPress: () => {
  //             // Allow screen to be removed
  //             navigation.dispatch(e.data.action);
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   });

  //   // Cleanup: remove the listener when the component unmounts
  //   return unsubscribe;
  // }, [navigation]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await UpdateDetail({
        user_id: userInfo.id,
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
                setLoading(true);
                await GetLatestDetail();
                navigation.navigate("SubScreenStack", {
                  screen: "My Profile",
                });
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step == 1 && <Step1 value={value} setValue={setValue} />}
      {step == 2 && <Step2 value={value} setValue={setValue} />}
      {step == 3 && <Step3 value={value} setValue={setValue} />}
      {step == 4 && <Step4 value={value} setValue={setValue} />}
      {step == 5 && <Step5 value={value} setValue={setValue} />}
      {step == 6 && <Step6 value={value} setValue={setValue} />}
      {step == 7 && <Step7 value={value} setValue={setValue} />}
      {step == 8 && <Step8 value={value} setValue={setValue} />}
      {step == 9 && <FinalStep setStep={setStep} handleSubmit={handleSubmit} />}

      {step != 9 && (
        <View style={styles.navigate_btn}>
          <TouchableOpacity
            style={styles.prev_btn}
            onPress={() => {
              if (step >= 2) setStep((prev) => prev - 1);
            }}
          >
            <Text style={{ color: "#6C66C8" }}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.next_btn}
            onPress={() => {
              if (step < 9) setStep((prev) => prev + 1);
            }}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function Step1({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>What is your Gender?</Text>
      </View>
      <View style={styles.answer}>
        <TouchableOpacity
          style={
            value.gender == "m"
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              gender: "m",
            }));
          }}
        >
          <Text style={{ color: value.gender == "m" ? "white" : "#6C66C8" }}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.gender == "f"
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              gender: "f",
            }));
          }}
        >
          <Text style={{ color: value.gender == "f" ? "white" : "#6C66C8" }}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
function Step2({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>What is your Age?</Text>
        <Text style={styles.question_subtext}>
          Age information helps us more accurately assess your metabolic level
        </Text>
      </View>
      <View style={styles.answer}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <TextInput
            style={{
              fontSize: 30,
              padding: 10,
              borderBottomWidth: 1,
              width: 100,
              textAlign: "center",
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) =>
              setValue((prev) => ({
                ...prev,
                age: text,
              }))
            }
            value={value.age.toString()}
            maxLength={5} //setting limit of input
          />
          <Text> yrs old</Text>
        </View>
      </View>
    </>
  );
}
function Step3({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>What is your Height?</Text>
        <Text style={styles.question_subtext}>
          Height information help us calculateyour BMI more accurately
        </Text>
      </View>
      <View style={styles.answer}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <TextInput
            style={{
              fontSize: 30,
              padding: 10,
              borderBottomWidth: 1,
              width: 100,
              textAlign: "center",
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) =>
              setValue((prev) => ({
                ...prev,
                height: text,
              }))
            }
            value={value.height.toString()}
            maxLength={5} //setting limit of input
          />
          <Text>cm</Text>
        </View>
      </View>
    </>
  );
}

function Step4({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>What is your Current Weight?</Text>
        <Text style={styles.question_subtext}>
          Weight information help us calculateyour BMI more accurately
        </Text>
      </View>
      <View style={styles.answer}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <TextInput
            style={{
              fontSize: 30,
              padding: 10,
              borderBottomWidth: 1,
              width: 100,
              textAlign: "center",
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) =>
              setValue((prev) => ({
                ...prev,
                weight: text,
              }))
            }
            value={value.weight.toString()}
            maxLength={5} //setting limit of input
          />
          <Text>kg</Text>
        </View>
      </View>
    </>
  );
}
function Step5({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>What is your Target Weight?</Text>
        <Text style={styles.question_subtext}>
          Weight information help us calculateyour BMI more accurately
        </Text>
      </View>
      <View style={styles.answer}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <TextInput
            style={{
              fontSize: 30,
              padding: 10,
              borderBottomWidth: 1,
              width: 100,
              textAlign: "center",
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) =>
              setValue((prev) => ({
                ...prev,
                target_weight: text,
              }))
            }
            value={value.target_weight.toString()}
            maxLength={5} //setting limit of input
          />
          <Text>kg</Text>
        </View>
      </View>
    </>
  );
}

function Step6({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>
          What is your exercise frequency?
        </Text>
      </View>
      <View style={styles.answer}>
        <TouchableOpacity
          style={
            value.exercise_freq == 0
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              exercise_freq: 0,
            }));
          }}
        >
          <Text
            style={{ color: value.exercise_freq == 0 ? "white" : "#6C66C8" }}
          >
            Not very active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.exercise_freq == 1
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              exercise_freq: 1,
            }));
          }}
        >
          <Text
            style={{ color: value.exercise_freq == 1 ? "white" : "#6C66C8" }}
          >
            Moderate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.exercise_freq == 2
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              exercise_freq: 2,
            }));
          }}
        >
          <Text
            style={{ color: value.exercise_freq == 2 ? "white" : "#6C66C8" }}
          >
            Persist in sports
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function Step7({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>How long can plank post last?</Text>
      </View>
      <View style={styles.answer}>
        <TouchableOpacity
          style={
            value.plank_last == 0
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              plank_last: 0,
            }));
          }}
        >
          <Text style={{ color: value.plank_last == 0 ? "white" : "#6C66C8" }}>
            Less than 30sec
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.plank_last == 1
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              plank_last: 1,
            }));
          }}
        >
          <Text style={{ color: value.plank_last == 1 ? "white" : "#6C66C8" }}>
            30-60sec
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.plank_last == 2
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              plank_last: 2,
            }));
          }}
        >
          <Text style={{ color: value.plank_last == 2 ? "white" : "#6C66C8" }}>
            Over 60sec
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function Step8({ setValue, value }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>
          Do you have any equipment at home?
        </Text>
      </View>
      <View style={styles.answer}>
        <TouchableOpacity
          style={
            value.home_equip == 0
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              home_equip: 0,
            }));
          }}
        >
          <Text style={{ color: value.home_equip == 0 ? "white" : "#6C66C8" }}>
            Nope
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            value.home_equip == 1
              ? [styles.answer_btn, styles.answer_selected]
              : styles.answer_btn
          }
          onPress={() => {
            setValue((prev) => ({
              ...prev,
              home_equip: 1,
            }));
          }}
        >
          <Text style={{ color: value.home_equip == 1 ? "white" : "#6C66C8" }}>
            Equipments available
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function FinalStep({ setStep, handleSubmit }) {
  return (
    <>
      <View style={styles.question}>
        <Text style={styles.question_text}>Save your details?</Text>
      </View>
      <View style={styles.answer}>
        <TouchableOpacity
          style={[styles.answer_btn, styles.answer_selected]}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.answer_btn]}
          onPress={() => {
            setStep(8);
          }}
        >
          <Text style={{ color: "#6C66C8" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  question_text: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: "80%",
  },
  question_subtext: {
    fontSize: 15,
    color: "grey",
    textAlign: "center",
    width: "80%",
    marginTop: 5,
  },
  answer: {
    flex: 1,
    alignItems: "center",
  },
  answer_btn: {
    width: 200,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "#6C66C8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  answer_selected: {
    backgroundColor: "#6C66C8",
  },
  navigate_btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
    paddingBottom: 50,
  },
  prev_btn: {
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "#6C66C8",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  next_btn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6C66C8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
