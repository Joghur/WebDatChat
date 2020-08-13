import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import CHATDATA from "../data/dummy-data";


const ChatScreen = ({ navigation, route }) => {
   const { receiverID, senderEmail } = route.params
  const userId = "JacobFH";
  const initialMessage = {
    senderId: "JacobFH",
    receiverId: "VincentTran",
    message: "",
  };
  const initialPrevMessages = [
    { senderId: "JacobFH", receiverId: "VincentTran", message: "" },
  ];
  const [message, setMessage] = useState(initialMessage);
  const [prevMessages, setPrevMessages] = useState(initialPrevMessages);

  const onSend = () => {
    setPrevMessages((prevArray) => [...prevArray, message]);
    setMessage(initialMessage);
  };

  useEffect(() => {
    setPrevMessages(CHATDATA);
  }, []);

  return (
    <View>
      <SafeAreaView>
      <Text>{receiverID}</Text>
      <Text>{senderEmail}</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={prevMessages}
            keyExtractor={(item) => item.index}
            renderItem={(item) => {
              if (item.item.senderId === userId) {
                return (
                  <View
                    key={item.item.index}
                    style={styles.senderMessageContainer}
                  >
                    <Text style={styles.senderMessage}>
                      {item.item.message}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={item.item.index}
                    style={styles.receiverMessageContainer}
                  >
                    <Text style={styles.receiverMessage}>
                      {item.item.message}
                    </Text>
                  </View>
                );
              }
            }}
          />
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
      </SafeAreaView>

    </View>
  );
};

export const screenOptions = {
  headerTitle: "Chat Screen",
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 10,
    flex: 1,
    margin: 10,
  },
  input: { marginRight: 10, width: "80%" },
  button: { width: "15%" },
  listContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
    position: "absolute", //skal ændres men tvinger beskederne til at ligge i bunden
    bottom: "15%",
  },
  senderMessageContainer: {
    backgroundColor: "#106cec",
    borderWidth: 1,
    borderColor: "#888",
    maxWidth: "60%",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    marginLeft: "auto",
  },
  senderMessage: {
    padding: 5,
    marginLeft: "auto",
  },
  receiverMessageContainer: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#888",
    maxWidth: "60%",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    marginRight: "auto",
  },
  receiverMessage: {
    padding: 5,
    marginRight: "auto",
  },
});

export default ChatScreen;
