import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Chat from "../models/chat";

const ChatScreen = ({ navigation, route }) => {
  const { receiverID } = route.params;
  const userId = "JacobFH";
  const sId = "JacobFH";
  const rId = "VincentTran";

  const [message, setMessage] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);

  const onSend = () => {
    console.log("Message: ", message.message);
    setPrevMessages((prevArray) => [
      ...prevArray,
      new Chat(sId, rId, message.message),
    ]);
    addMessageFireBase(sId, rId, message.message);
    setMessage("");
  };

  const addMessageFireBase = async (senderId, receiverId, message) => {
    const response = await fetch(
      "https://webdevchat-9c6c2.firebaseio.com/chat.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          message,
        }),
      }
    );

    const chatData = await response.json();

    return chatData;
  };

  const getMessageFireBase = useCallback(async () => {
    let response = await fetch(
      "https://webdevchat-9c6c2.firebaseio.com/chat.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await response.json();
    const loadedData = [];
    for (const key in resData) {
      loadedData.push(
        new Chat(
          resData[key].senderId,
          resData[key].receiverId,
          resData[key].message
        )
      );
    }
    console.log("LOADEDDATA: ", loadedData);
    setPrevMessages(loadedData);
  }, []);

  useEffect(() => {
    getMessageFireBase();
  }, [getMessageFireBase]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.listContainer}>
          <View style={styles.test}>
            {prevMessages.map((pm, index) => {
              if (pm.senderId !== userId) {
                return (
                  <View style={styles.receiverMessageContainer} key={index}>
                    <Text style={styles.receiverMessage}>{pm.message}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.senderMessageContainer} key={index}>
                    <Text style={styles.senderMessage}>{pm.message}</Text>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setMessage({ message: text });
          }}
          placeholder="Type stuff"
          value={message.message}
        />
        <Button title={"Send"} onPress={onSend} />
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Chat Screen",
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  inputContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 10,
    maxHeight: "10%",
  },
  input: {
    marginRight: 10,
    width: "70%",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#888",
  },
  button: {
    width: "30%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    //backgroundColor: "#888", // test
    padding: 7,
  },
  test: {
    flex: 1,
    justifyContent: "space-between",
  },
  senderMessageContainer: {
    backgroundColor: "#106cec",
    borderWidth: 1,
    borderColor: "#888",
    maxWidth: "60%",
    padding: 7,
    borderRadius: 10,
    elevation: 10,
    marginLeft: "auto",
  },
  senderMessage: {
    padding: 5,
    fontSize: 18,
  },
  receiverMessageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#888",
    maxWidth: "60%",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    marginRight: "auto",
  },
  receiverMessage: {
    padding: 5,
    fontSize: 18,
  },
});

export default ChatScreen;
