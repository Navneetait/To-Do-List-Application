import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TodoItem from "./components/TodoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import BlankScreen from "./components/BlankScreen";
const Tasks = ({
  list,
  completed,
  tab,
  setPendingList,
  setCompletedList,
  setText,
  setOnDelete,
  setShowDelete,
}) => {
  const deleteHandler = () => {
    const func = async () => {
      for (let item of completed) {
        try {
          await AsyncStorage.removeItem(item.id.toString());
        } catch (err) {}
      }
      setCompletedList([]);
      console.log("Clicked");
      setShowDelete(false);
    };
    setText("All");
    setOnDelete(() => () => {
      func();
    });
    setShowDelete(true);
  };
  if (tab === 1 && list.length === 0)
    return <BlankScreen text="No Task Pending" />;
  if (tab === 2 && completed.length === 0)
    return <BlankScreen text="No Task Completed" />;
  return (
    <View style={{ marginBottom: 70, flex: 1 }}>
      <ScrollView>
        {tab === 1 &&
          list &&
          list.map(({ id, text }) => (
            <TodoItem
              key={id}
              id={id}
              text={text}
              checkBox={false}
              setCompletedList={setCompletedList}
              setPendingList={setPendingList}
              setText={setText}
              setOnDelete={setOnDelete}
              setShowDelete={setShowDelete}
            />
          ))}
        {tab === 2 &&
          completed &&
          completed.map(({ id, text }) => (
            <TodoItem
              key={id}
              id={id}
              text={text}
              checkBox={true}
              setCompletedList={setCompletedList}
              setPendingList={setPendingList}
              setText={setText}
              setOnDelete={setOnDelete}
              setShowDelete={setShowDelete}
            />
          ))}
        {tab === 2 && completed.length > 0 && (
          <TouchableOpacity
            style={styles.delete}
            activeOpacity={0.9}
            onPress={deleteHandler}
          >
            <MaterialIcons name="delete" size={20} color="white" />
            <Text style={styles.text}>Clear All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  delete: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#5D4E60",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 7,
  },
});

export default Tasks;
