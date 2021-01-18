import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialState);

  function register() {
    const { email, password, name } = formState;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
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
          setFormState((currentState) => ({
            ...currentState,
            name,
          }))
        }
        value={formState.name}
      />
      <TextInput
        placeholder="email"
        onChangeText={(email) =>
          setFormState((currentState) => ({
            ...currentState,
            email,
          }))
        }
        value={formState.email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) =>
          setFormState((currentState) => ({
            ...currentState,
            password,
          }))
        }
        value={formState.password}
      />

      <Button onPress={() => register()} title="Register" />
    </View>
  );
};

export default Register;
