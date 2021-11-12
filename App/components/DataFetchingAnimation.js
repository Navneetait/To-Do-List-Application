import React, { useState } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DataFetchingAnimation = () => {
  const rotation = useState(new Animated.Value(0))[0];
  const rotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 360,
        duration: 500,
        useNativeDriver: true,
      })
    ).start();
  };
  const interpolateRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  rotationAnimation();
  return (
    <View style={styles.container}>
      <Text style={styles.textSyle}>Loading</Text>
      <Animated.View
        style={{
          transform: [
            {
              rotateZ: interpolateRotation,
            },
          ],
        }}
      >
        <AntDesign name="loading1" size={120} color="#5D4E60" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSyle: {
    position: "absolute",
    color: "#5D4E60A0",
    fontSize: 15,
  },
});

export default DataFetchingAnimation;
