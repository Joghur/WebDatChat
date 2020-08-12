import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableWithoutFeedback } from "react-native";

const UserListScreen = (props) => {

  const [usersArray, setUsersArray] = useState([])

  const onUserClick = () => {
    console.log('user clicked')
  }

  useEffect(() => {
    try{
        const fetchData = async () => {
        const response = await fetch("https://firestore.googleapis.com/v1beta1/projects/webdatchat-772f0/databases/(default)/documents/users/")
        const data = await response.json()

        //we have to map through an array. data is an object while data.documents is an array
        let dataArray = data.documents

       let mappedArray = dataArray.map((item, index) => {

         //specifc name and email data
         /*
         console.log(item.fields.name.stringValue)
         console.log(item.fields.email.stringValue)
         */

         //return the content
        return (
          <TouchableWithoutFeedback onPress={onUserClick} key={index}>
            <View style={styles.usersContainer}>
              <Text>{item.fields.name.stringValue}</Text>
              <Text>{item.fields.email.stringValue}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
       })
       //set the array in the state
       setUsersArray([mappedArray])

        return data
      }

      fetchData()
    }
    catch(err){
      console.log(err)
    }
  }, [])
  

  return (
    <ScrollView>
        {usersArray}
    </ScrollView>
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
