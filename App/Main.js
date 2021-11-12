import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Addtodo from "./components/AddTodo";
import Tasks from "./Tasks";
import TodoForm from "./components/TodoForm";
import Delete from "./components/Delete";
const Main = ({
  pendingList,
  completedList,
  setPendingList,
  setCompletedList,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [text, setText] = useState("");
  const [onDelete, setOnDelete] = useState(() => () => {});
  const [tab, setTab] = useState(1);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <Tasks
          list={pendingList}
          completed={completedList}
          tab={tab}
          setPendingList={setPendingList}
          setCompletedList={setCompletedList}
          setText={setText}
          setOnDelete={setOnDelete}
          setShowDelete={setShowDelete}
        />
        <Footer
          changeTab={(tab) => {
            setTab(tab);
          }}
          tab={tab}
        />
        {!showForm && tab === 1 && !showDelete && (
          <Addtodo setShowForm={setShowForm} />
        )}
      </View>
      {showForm && (
        <TodoForm
          hideForm={() => {
            setShowForm(false);
          }}
          addItem={(item) => {
            setPendingList((prev) => [...prev, item]);
          }}
        />
      )}
      {showDelete && (
        <Delete
          hide={() => {
            setShowDelete(false);
          }}
          onDelete={() => {
            onDelete();
          }}
          item={text}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default Main;
