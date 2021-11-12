import React, { useEffect } from "react";
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
const Delete = ({ hide, onDelete, item }) => {
  useEffect(() => {
    const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
      hide();
      return true;
    });
    return () => {
      backAction.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Delete {item} ?</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={hide}>
            <Entypo name="cross" size={22} color="white" />
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onDelete}>
            <MaterialIcons name="delete" size={20} color="white" />
            <Text style={styles.btnText}>Delete</Text>
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

export default Delete;
