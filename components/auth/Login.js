import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  function login() {
    const { email, password } = state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(email) =>
          setState((currentValue) => ({
            ...currentValue,
            email,
          }))
        }
        value={state.email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) =>
          setState((currentValue) => ({
            ...currentValue,
            password,
          }))
        }
        value={state.password}
      />

      <Button onPress={() => login()} title="Login" />
    </View>
  );
};

export default Login;
