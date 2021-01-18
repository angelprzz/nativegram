import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import firebase from "firebase";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import HomeScreen from "./components/Home";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import CommentsScreen from "./components/main/Comments";

import rootReducer from "./store/reducers";

import firebaseConfig from "./config";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

function App(props) {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  });

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            navigation={props.navigation}
          />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            navigation={props.navigation}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            navigation={props.navigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
