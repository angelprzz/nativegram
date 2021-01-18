import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialState);

  function login() {
    const { email, password } = formState;
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
          setFormState((currentValue) => ({
            ...currentValue,
            email,
          }))
        }
        value={formState.email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) =>
          setFormState((currentValue) => ({
            ...currentValue,
            password,
          }))
        }
        value={formState.password}
      />

      <Button onPress={() => login()} title="Login" />
    </View>
  );
};

export default Login;
