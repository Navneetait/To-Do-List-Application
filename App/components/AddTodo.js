import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Addtodo = ({ setShowForm }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => {
        setShowForm(true);
      }}
    >
      <Ionicons name="add-circle" size={21} color="white" />
      <Text style={styles.text}>Add Todo</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 100,
    right: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 130,
    backgroundColor: "#5D4E60",
    borderRadius: 100,
    elevation: 10,
  },
  text: {
    color: "white",
    marginLeft: 10,
    fontSize: 15,
  },
});

export default Addtodo;
