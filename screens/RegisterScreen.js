import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

import { API_Key } from '../settings_mbt.json';

const register = async (email, password) => {
	console.log('register, email, password', email, password);
	const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_Key, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
			returnSecureToken: true
		})
	});

	if (!response.ok) {
		const errorResData = await response.json();
		console.log(errorResData);
		const errorId = errorResData.error.message;
		let message = 'Register went wrong!';
		if (errorId === 'EMAIL_EXISTS') {
			message = 'This email exists already!';
		}
		if (errorId === 'OPERATION_NOT_ALLOWED') {
			message = 'This action is not allowed!';
		}
		if (errorId === 'WEAK_PASSWORD : Password should be at least 6 characters') {
			message = 'This password is not string enough!';
		}
		throw new Error(message);
	}

	const resData = await response.json();
	console.log(resData);
};

const RegisterScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const onChangeHandlerEmail = (txt) => {
		setEmail(txt);
	};
	const onChangeHandlerPassword = (txt) => {
		setPassword(txt);
	};

	const registerHandler = async () => {
		console.log('registerHandler');

		setIsLoading(true);
		try {
			register(email, password);
      setIsLoading(false);
      props.navigation.navigate('Start')
		} catch (err) {
			setIsLoading(false);
		}
	};

	return (
		<View>
			<Text> Register Screen</Text>
			<Text>Email</Text>
			<TextInput id="email" value={email} onChangeText={onChangeHandlerEmail} />

			<Text>Password</Text>
			<TextInput id="password" value={password} onChangeText={onChangeHandlerPassword} />
			{/* <View>{error && <Text>error</Text>}</View> */}
			<View>{isLoading ? <Text>IsLoading</Text> : <Button title={'Register'} onPress={registerHandler} />}</View>
			<Button title="Go to Userlist" onPress={() => props.navigation.navigate('UserList')} />
			<Button title="Go to Home" onPress={() => props.navigation.popToTop()} />
		</View>
	);
};

export const screenOptions = {
	headerTitle: 'Register Screen'
};

const styles = StyleSheet.create({});

export default RegisterScreen;
