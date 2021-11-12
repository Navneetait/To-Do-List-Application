import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FontAwesome5 name="clipboard-list" size={24} color="white" />
        <Text style={styles.text}>Todo App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "#5D4E60",
    justifyContent: "flex-end",
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 22,
    marginLeft: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 10,
    // fontFamily: "cursive",
  },
});

export default Header;
