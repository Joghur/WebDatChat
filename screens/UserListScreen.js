import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList } from "react-native";

import User from '../models/user'

const UserListScreen = ({ navigation, route }) => {

  const [usersArray, setUsersArray] = useState([])

  const { email } = route.params

  const onUserClick = (item, index) => {
    //console.log(`user ${item.name} with index ${index} clicked`)
    navigation.navigate('Chat', {
      receiverId: item.id,
      receiverEmail: item.email,
      senderEmail: loggedInUser[0].email,
      senderId: loggedInUser[0].id
    })
  }

  const itemContainer = ({ item, index }) => {
    return(
      <View key={index} style={styles.usersContainer}>
        <TouchableWithoutFeedback onPress={onUserClick.bind(this, item, index)}>
          <View>
            <Text>{item.email}</Text>
          </View>
        </TouchableWithoutFeedback>
    </View>
    )
  }

  useEffect(() => {
    try{
        const fetchData = async () => {
        const firebaseURL = `https://rn-pracshop.firebaseio.com/users.json`
        const response = await fetch(firebaseURL)
        const data = await response.json()
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
          loadedProducts.push(new User(
            key,
            data[key].email
          ))
        }
        const loggedInUser = loadedProducts.filter((user) => {
            return user.email === email
        })

        console.log('loggedinuser', loggedInUser[0].email, loggedInUser[0].id);

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
       setUsersArray(loadedProducts)
       //console.log('usersarray', usersArray)
      }

      fetchData()
    }
    catch(err){
      console.log(err)
    }
  }, [])
  

  return (
    <View>
      <Text>{email}</Text>
        <FlatList data={usersArray} renderItem={itemContainer} keyExtractor={(id, index) => index} numColumns={2}></FlatList>
    </View>
  );
};

export const screenOptions = {
  headerTitle: "Userlist Screen",
};

const styles = StyleSheet.create({
  usersContainer:{
    flex: 1,
    marginBottom: 50
  }
});

export default UserListScreen;
