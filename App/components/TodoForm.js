import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TodoForm = ({ hideForm, addItem }) => {
  useEffect(() => {
    const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
      hideForm();
      return true;
    });
    return () => {
      backAction.remove();
    };
  }, []);
  const [text, setText] = useState("");
  const submitHandler = async () => {
    const newTodo = {
      id: Date.now(),
      text: text,
    };
    addItem(newTodo);
    hideForm();
    const key = newTodo.id.toString();
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ ...newTodo, isCompleted: false })
      );
    } catch (err) {
      alert("insufficient Storage");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Add Todo</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Todo"
          placeholderTextColor="#382C3AA0"
          selectionColor="#382C3AB0"
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
          onSubmitEditing={submitHandler}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={hideForm}>
            <Entypo name="cross" size={22} color="white" />
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={submitHandler}>
            <MaterialIcons name="done" size={20} color="white" />
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: "#EADEEE",
    // height: 250,
    width: "85%",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#5D4E60",
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: "#E9C8F3",
    paddingHorizontal: 10,
    color: "#382C3A",
  },
  text: {
    color: "#382C3A",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  btnContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  btn: {
    backgroundColor: "#5D4E60",
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 9,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 5,
  },
});

export default TodoForm;
