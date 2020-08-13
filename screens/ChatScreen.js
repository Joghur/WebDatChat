import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Chat from "../models/chat";
import Colors from "../constants/Colors";

const ChatScreen = ({ navigation, route }) => {
  const { receiverId, receiverEmail, senderId, senderEmail } = route.params;

  const [message, setMessage] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);

  const onSend = () => {
    setPrevMessages((prevArray) => [
      ...prevArray,
      new Chat(senderId, receiverId, message.message),
    ]);
    addMessageFireBase(senderId, receiverId, message.message);
    setMessage("");
  };

  const addMessageFireBase = async (senderId, receiverId, message) => {
    const response = await fetch(
      "https://rn-pracshop.firebaseio.com/chats.json",
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
      "https://rn-pracshop.firebaseio.com/chats.json",
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
    setPrevMessages(loadedData);
  }, []);

  useEffect(() => {
    setInterval(() => {
      getMessageFireBase();
    }, 2000);
  }, [getMessageFireBase]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{receiverEmail}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.listContainer}>
          <View style={styles.test}>
            {prevMessages
              .filter(
                (pm) =>
                  (pm.senderId === senderId && pm.receiverId === receiverId) ||
                  (pm.senderId === receiverId && pm.receiverId === senderId)
              )
              .map((pm, index) => {
                if (pm.senderId !== senderId) {
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
        <Button style={styles.button} title={"Send"} onPress={onSend} />
      </View>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Chat Screen",
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
  },
  email: {
    fontFamily: "saw-bold",
    fontSize: 18,
    color: Colors.accent,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 10,
    maxHeight: "10%",
  },
  input: {
    fontFamily: "saw-regular",
    fontSize: 15,
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
    padding: 10,
    margin: 5,
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
    fontFamily: "saw-regular",
    padding: 5,
    fontSize: 20,
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
    fontFamily: "saw-regular",
    padding: 5,
    fontSize: 20,
  },
});

export default ChatScreen;
