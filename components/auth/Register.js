import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

export default function Register() {
  [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });

  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={(name) => setState({ name })}
      />
      <TextInput
        placeholder="email"
        onChangeText={(password) => setState({ password })}
      />
      <TextInput
        placeholder="name"
        secureTextEntry={true}
        onChangeText={(password) => this.setState({ password })}
      />

      <Button onPress={() => this.onSignUp()} title="Sign Up" />
    </View>
  );
}
