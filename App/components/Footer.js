import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Footer = ({ tab, changeTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabContainer, tab === 1 && styles.active]}
        onPress={() => {
          changeTab(1);
        }}
      >
        <AntDesign name="checkcircle" size={18} color="white" />
        <Text style={styles.text}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabContainer, tab === 2 && styles.active]}
        onPress={() => {
          changeTab(2);
        }}
      >
        <Ionicons name="checkmark-done-circle-sharp" size={22} color="white" />
        <Text style={styles.text}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#5D4E60",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabContainer: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    marginLeft: 10,
    fontSize: 15,
  },
  active: {
    backgroundColor: "#483A4A",
  },
});

export default Footer;
