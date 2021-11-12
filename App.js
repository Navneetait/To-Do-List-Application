import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Main from "./App/Main";
import DataFetchingAnimation from "./App/components/DataFetchingAnimation";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const loadData = async () => {
    const pending = [];
    const complete = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (let key of keys) {
        const item = await AsyncStorage.getItem(key);
        const data = JSON.parse(item);
        if (!data.isCompleted) pending.push(data);
        else complete.push(data);
        // console.log(data);
      }
    } catch (err) {}
    setPendingList(pending);
    setCompletedList(complete);
    setDataLoaded(true);
  };
  useEffect(() => {
    loadData();
  }, []);
  if (!dataLoaded) return <DataFetchingAnimation />;
  return (
    <>
      <StatusBar style="light" />
      <Main
        pendingList={pendingList}
        completedList={completedList}
        setPendingList={setPendingList}
        setCompletedList={setCompletedList}
      />
    </>
  );
}
