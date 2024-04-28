import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Modal,
} from "react-native";
import Breakfast from "../../assets/icons/breakfast.png";
import Lunch from "../../assets/icons/lunch.png";
import Dinner from "../../assets/icons/dinner.png";
import { Button1 } from "../Button";
import foods from "../../config/foods.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

function MealChallenge() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 10 }}>
        Daily Meal Challenge
      </Text>
      <View style={styles.meal_list}>
        <MealItem type={"Breakfast"} />
        <MealItem type={"Lunch"} />
        <MealItem type={"Dinner"} />
      </View>
    </View>
  );
}

function MealItem({ type }) {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState([]);
  const iconType = {
    Breakfast: Breakfast,
    Lunch: Lunch,
    Dinner: Dinner,
  };
  const underValue = {
    Breakfast: 400,
    Lunch: 600,
    Dinner: 600,
  };
  const overValue = {
    Breakfast: 550,
    Lunch: 800,
    Dinner: 800,
  };
  const targetValue = {
    Breakfast: 500,
    Lunch: 700,
    Dinner: 700,
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setValue(
      selected.reduce((acc, a) => {
        return acc + a.calories;
      }, 0)
    );
  }, [selected]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.popup_container}>
          <View style={styles.popup_content}>
            <View style={styles.popup_header}>
              <Text>Your {type} Meals</Text>
              <Button1 text={"Close"} onPress={handleCloseModal} />
            </View>
            <ScrollView
              style={styles.meal_options}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {foods.food.map((meal, index) => {
                return (
                  <View key={index} style={styles.meal_option}>
                    <View>
                      <Text style={{ fontSize: 15, flex: 1 }}>{meal.name}</Text>
                      <Text style={{ fontSize: 12 }}>
                        (Calories per 100g: {meal.calories})
                      </Text>
                    </View>

                    <View style={styles.quantity_row}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          const index = selected.findIndex(
                            (item) => item.name == meal.name
                          );
                          if (index !== -1) {
                            const newArray = [...selected]; // Create a copy of the original array
                            newArray.splice(index, 1); // Remove one element starting from the found index
                            setSelected(newArray); // Update the state with the modified array
                          }
                        }}
                      >
                        <View style={styles.quantity_btn}>
                          <Text style={{ color: "white", fontSize: 15 }}>
                            -
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Text style={styles.quantity}>
                        {selected.reduce(
                          (total, x) => total + (x.name == meal.name),
                          0
                        )}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          setSelected((prev) => {
                            return [...prev, meal];
                          })
                        }
                      >
                        <View style={styles.quantity_btn}>
                          <Text style={{ color: "white", fontSize: 15 }}>
                            +
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
        <View style={styles.meal_item}>
          <Image style={styles.meal_icon} source={iconType[type]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.meal_label}>{type}</Text>
            <Progressbar
              under={underValue[type]}
              over={overValue[type]}
              target={targetValue[type]}
              value={value}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

function Progressbar({ under, over, target, value }) {
  const StatusColor = () => {
    if (value < under) {
      return "#E9B530";
    }
    if (value > over) {
      return "#F37C7C";
    }

    return "#4AD917";
  };

  return (
    <View style={styles.progressbar}>
      <View
        style={{
          flex: 1,
          width: `${(value / target) * 100}%`,
          backgroundColor: StatusColor(),
        }}
      ></View>
      <Text style={styles.progresstext}>
        {value}/{target} Calories
      </Text>
    </View>
  );
}

export default MealChallenge;

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
  meal_item: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  meal_icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  meal_label: {
    color: "white",
  },

  progressbar: {
    height: 30,
    width: "100%",
    backgroundColor: "#8B85EE",
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
  },
  progresstext: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "white",
    fontSize: 10,
  },

  popup_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup_content: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popup_header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  meal_options: {
    padding: 10,
    backgroundColor: "#ECEDFF",
    borderRadius: 5,
    gap: 15,
  },
  meal_option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  quantity_row: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  quantity_btn: {
    backgroundColor: "#8B85EE",
    padding: 5,
    paddingHorizontal: 8,
  },
  quantity: {
    alignSelf: "center",
    width: 40,
    textAlign: "center",
  },
  add_btn: {
    backgroundColor: "#8B85EE",
    padding: 5,
  },
});
