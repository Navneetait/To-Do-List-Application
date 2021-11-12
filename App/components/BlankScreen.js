import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const BlankScreen = ({ text }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img.png")} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "rgba(0,0,0,0.3)",
    marginTop: 10,
  },
});

export default BlankScreen;
