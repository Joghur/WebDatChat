import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

import User from "../models/user";

const UserListScreen = ({ navigation, route }) => {
  const [usersArray, setUsersArray] = useState([]);
  const [sender, setSender] = useState({});

  const { email } = route.params;

  const onUserClick = (item, index) => {
    //console.log(`user ${item.name} with index ${index} clicked`)
    navigation.navigate("Chat", {
      receiverId: item.id,
      receiverEmail: item.email,
      senderEmail: sender.email,
      senderId: sender.id,
    });
  };

  const itemContainer = ({ item, index }) => {
    return (
      <View key={index} style={styles.usersContainer}>
        <TouchableWithoutFeedback onPress={onUserClick.bind(this, item, index)}>
          <View style={styles.userContainer}>
            <Text style={styles.user}>{item.email}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const firebaseURL = `https://rn-pracshop.firebaseio.com/users.json`;
        const response = await fetch(firebaseURL);
        const data = await response.json();
        //console.log(data)

        //we have to map through an array. data is an object while data.documents is an array
        //let dataArray = data.documents

        //array to save name and email
        const temp = [];

        const loadedProducts = [];
        //console.log('data', data)
        for (const key in data) {
          //console.log('data[key]', data[key])
          //console.log('[key]', key)
          loadedProducts.push(new User(key, data[key].email));
        }

        const loggedInUser = loadedProducts.filter((user) => {
          return user.email === email;
        });
        const otherUsers = loadedProducts.filter((user) => {
          return user.email !== email;
        });

        const otherUsers2 = otherUsers.sort((a, b) => {
          let fa = a.email.toLowerCase(),
            fb = b.email.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        //console.log("loggedinuser", loggedInUser[0].email, loggedInUser[0].id);

        //console.log('loadedproducts', loadedProducts)
        //let mappedArray = data.map((item, index) => {
        //console.log(item)
        //specifc name and email data
        /*
         console.log(item.fields.name.stringValue)
         console.log(item.fields.email.stringValue)
         */

        //push data to array
        //temp.push({name: item.fields.name.stringValue, email: item.fields.email.stringValue})

        //console.log(temp)

        //set the array in the state
        setUsersArray(otherUsers2);
        setSender(loggedInUser[0]);
        //console.log('usersarray', usersArray)
      };

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View>
      <FlatList
        data={usersArray}
        renderItem={itemContainer}
        keyExtractor={(id, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Userlist Screen",
};

const styles = StyleSheet.create({
  usersContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  userContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    padding: 5,
    borderColor: "#888",
    borderWidth: 0.5,
  },
  user: {
    fontSize: 20,
    fontFamily: "saw-bold",
  },
});

export default UserListScreen;
