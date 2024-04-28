import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import GetTutorialDetail from "../../api/get_tutorial_detail";
import GetCompleteStatus from "../../api/get_complete_status";
import Sample from "../../assets/sample_exercise.png";
import { useAppContext } from "../../Context";
import Fontisto from "react-native-vector-icons/Fontisto";
import MarkComplete from "../../api/mark_complete";
const screenWidth = Dimensions.get("window").width;

function TutorialDetailScreen({ route }) {
  const { userInfo, setShowLogin, setLoading } = useAppContext();
  const [loading, setPageLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState([]);
  const scrollViewRef = useRef(null);

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setStep(index);
  };

  const PremiumBlock = () => {
    if (!info?.premium) return false;

    if (info?.premium && userInfo != null) return false;

    return true;
  };

  useEffect(() => {
    TutorialDetail();
    if (userInfo) CompleteStatus();
  }, [route]);

  const TutorialDetail = async () => {
    try {
      setPageLoading(true);
      let res = await GetTutorialDetail(route.params.tutorial_id);
      resJson = await res.json();
      if (res.status == 200) setInfo(resJson.data);
    } catch (e) {
      console.log(e);
    } finally {
      setPageLoading(false);
    }
  };

  const MarkAsComplete = async () => {
    try {
      setLoading(true);
      let res = await MarkComplete({
        user_id: userInfo.id,
        tutorial_id: route.params.tutorial_id,
      });
      resJson = await res.json();
      await CompleteStatus();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const CompleteStatus = async () => {
    try {
      let res = await GetCompleteStatus(userInfo?.id, route.params.tutorial_id);
      resJson = await res.json();
      if (res.status == 200) setIsComplete(resJson.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : PremiumBlock() ? (
        <View style={styles.premium_block}>
          <Fontisto
            name={"locked"}
            style={{ color: "white", fontSize: 40, marginBottom: 20 }}
          />
          <Text
            style={{
              width: "80%",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            This is Premium Classes
          </Text>
          <Text
            style={{
              width: "80%",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Only available for registered user
          </Text>
          <TouchableOpacity
            style={styles.sign_in}
            onPress={() => {
              setShowLogin(true);
            }}
          >
            <Text style={{ color: "#6C66C8", fontWeight: "bold" }}>
              Sign In Now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            style={styles.steps_container}
          >
            <SafeAreaView style={styles.step}>
              <Text style={styles.name}>{info.name}</Text>
              <Text style={styles.desc}>{info.description}</Text>
              <Text style={styles.time}>
                Time: <Text style={{ fontWeight: "bold" }}>{info.time}</Text>{" "}
                mins
              </Text>
              <Text style={styles.start_btn}>Swipe Left To Begin</Text>
            </SafeAreaView>
            {info.exercise.map((e, index) => {
              return <Step key={index} e={e} />;
            })}
            <SafeAreaView style={styles.step}>
              <Text
                style={{ fontWeight: "bold", fontSize: 25, marginBottom: 20 }}
              >
                End of Tutorial
              </Text>
              {isComplete.length ? (
                <Text>You've Completed this Workout Today</Text>
              ) : (
                <TouchableOpacity
                  style={styles.complete_btn}
                  onPress={MarkAsComplete}
                >
                  <Text style={{ color: "white" }}>Mark as Complete</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.work_plan}>
                <Text style={{ color: "#6C66C8" }}>Add to my Workout Plan</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
          <View style={styles.bars}>
            {[...info.exercise, 1, 2].map((e, index) => (
              <View
                key={index}
                style={{
                  ...styles.bar,
                  backgroundColor:
                    step == index ? "#6C66C8" : "rgba(0,0,0,0.2)",
                }}
              ></View>
            ))}
          </View>
          <Image
            style={styles.background}
            source={{
              uri: info.img_url,
            }}
          />
        </>
      )}
    </View>
  );
}

function Step({ e }) {
  return (
    <SafeAreaView style={styles.step}>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <Image source={Sample} style={styles.illustration} />
        <Text style={styles.name}>{e.name}</Text>
        <Text>{e.description}</Text>
        <View style={styles.reps}>
          {e.reps > 0 && (
            <Text style={styles.reps_text}>
              Reps:{" "}
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>{e.reps}</Text>
            </Text>
          )}
          {e.duration > 0 && (
            <Text style={styles.reps_text}>
              Duration:{" "}
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {e.duration}
              </Text>
              mins
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.15,
  },
  bars: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
    marginBottom: 50,
    paddingHorizontal: 50,
  },
  bar: {
    height: 10,
    flex: 1,
  },
  steps_container: {
    zIndex: 2,
  },
  step: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    marginTop: "auto",
  },
  desc: {
    textAlign: "center",
    width: "70%",
  },
  time: {
    padding: 5,
    paddingHorizontal: 10,
    color: "#6C66C8",
    borderColor: "#6C66C8",
    borderWidth: 1,
    marginTop: 20,
  },
  start_btn: {
    padding: 5,
    paddingHorizontal: 10,
    color: "#6C66C8",
    fontSize: 20,
    marginTop: "auto",
    fontWeight: "bold",
    marginBottom: 100,
  },
  illustration: {
    width: 120,
    height: 200,
    alignSelf: "center",
  },
  reps: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
  reps_text: {
    color: "#6C66C8",
    fontSize: 20,
  },
  premium_block: {
    flex: 1,
    backgroundColor: "#6C66C8",
    justifyContent: "center",
    alignItems: "center",
  },
  sign_in: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 99,
  },
  complete_btn: {
    backgroundColor: "#6C66C8",
    padding: 10,
    width: 200,
    alignItems: "center",
  },
  work_plan: {
    borderColor: "#6C66C8",
    borderWidth: 1,
    padding: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
});

export default TutorialDetailScreen;
