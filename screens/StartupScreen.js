import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, useState } from 'react-native';

// const login = async (email, password) => {
// 	const response = await fetch(
// 		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				email: email,
// 				password: password,
// 				returnSecureToken: true
// 			})
// 		}
//     );
    
// 	if (!response.ok) {
// 		const errorResData = await response.json();
// 		const errorId = errorResData.error.message;
// 		let message = 'Something went wrong!';
// 		if (errorId === 'EMAIL_NOT_FOUND') {
// 			message = 'This email could not be found!';
// 		} else if (errorId === 'INVALID_PASSWORD') {
// 			message = 'This password is not valid!';
// 		}
// 		throw new Error(message);
// 	}

// 	const resData = await response.json();
// 	console.log(resData);
// 	// dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
// 	// const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
//     // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
//     saveDataToStorage(token, userId)
// };

// const saveDataToStorage = (token, userId) => {
//     AsyncStorage.setItem(
//       'userData',
//       JSON.stringify({
//         token: token,
//         userId: userId
//       })
//     );
//   };


const StartupScreen = () => {
	// const [ isLoading, setIsLoading ] = useState(false);

	return (
		<View>
			<Text>StartupScreen</Text>
		</View>
	);
};

export default StartupScreen;

const styles = StyleSheet.create({});
