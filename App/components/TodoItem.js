import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};
const TodoItem = ({
  text,
  checkBox,
  id,
  setPendingList,
  setCompletedList,
  setText,
  setOnDelete,
  setShowDelete,
}) => {
  const width = useWindowDimensions().width;
  const [checked, setChecked] = useState(checkBox);
  const x = useState(new Animated.Value(0))[0];
  const slideRight = () => {
    Animated.timing(x, {
      toValue: width,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };
  const slideLeft = () => {
    Animated.timing(x, {
      toValue: -width,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };

  const completeTask = () => {
    setPendingList((prev) => {
      for (let item of prev) {
        if (item.id === id) {
          setCompletedList((prev2) => {
            return [...prev2, item];
          });
          return prev;
        }
      }
    });
    slideRight();
    setTimeout(() => {
      let selectedItem;
      setPendingList((prev) => {
        const newList = [];
        for (let item of prev) {
          if (item.id !== id) newList.push(item);
          else {
            selectedItem = item;
          }
        }
        return newList;
      });
      const value = JSON.stringify({ ...selectedItem, isCompleted: true });
      const key = selectedItem.id.toString();
      storeData(key, value);
    }, 300);
  };
  const unCompleteTask = () => {
    setCompletedList((prev) => {
      for (let item of prev) {
        if (item.id === id) {
          setPendingList((prev2) => {
            return [...prev2, item];
          });
          return prev;
        }
      }
    });
    slideLeft();
    setTimeout(() => {
      let selectedItem;
      setCompletedList((prev) => {
        const newList = [];
        for (let item of prev) {
          if (item.id !== id) newList.push(item);
          else {
            selectedItem = item;
          }
        }
        return newList;
      });
      const value = JSON.stringify({ ...selectedItem, isCompleted: false });
      const key = selectedItem.id.toString();
      storeData(key, value);
    }, 300);
  };
  const deleteHandler = () => {
    setText(text);
    const func = async () => {
      setCompletedList((prev) => {
        const newList = [];
        for (let item of prev) {
          if (item.id !== id) newList.push(item);
        }
        return newList;
      });
      setPendingList((prev) => {
        const newList = [];
        for (let item of prev) {
          if (item.id !== id) newList.push(item);
        }
        return newList;
      });
      try {
        await AsyncStorage.removeItem(id.toString());
      } catch (err) {}
      setShowDelete(false);
    };
    setOnDelete(() => () => {
      func();
    });
    setShowDelete(true);
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: x,
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setChecked((prev) => !prev);
          if (checked) {
            unCompleteTask();
          } else {
            completeTask();
          }
        }}
        style={styles.body}
      >
        {!checked && (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={22}
            color="#5D4E60"
          />
        )}
        {checked && (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={22}
            color="#5D4E60"
          />
        )}
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          activeOpacity={0.9}
          onPress={deleteHandler}
        >
          <MaterialIcons name="delete" size={20} color="#5D4E60" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EADEEE",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 15,
    color: "#5D4E60",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default TodoItem;
