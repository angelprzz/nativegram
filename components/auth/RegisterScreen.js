import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";
import firebaseConfig from "../../config";

const RegisterScreen = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  function register() {
    const { email, password, name } = state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
        placeholder="name"
        onChangeText={(name) =>
          setState((currentValue) => ({
            ...currentValue,
            name,
          }))
        }
        value={state.name}
      />
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

      <Button onPress={() => register()} title="Register" />
    </View>
  );
};

export default RegisterScreen;
