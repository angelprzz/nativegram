import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { useSelector, useDispatch } from "react-redux";

function Home() {
  const user = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is loggedm in</Text>
    </View>
  );
}

export default Home;
