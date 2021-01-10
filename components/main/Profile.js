import React from "react";
import { View, Text, Image, FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((store) => store.userState.currentUser);
  console.log(currentUser);
  return (
    <View>
      <Text>{currentUser.name}</Text>
    </View>
  );
};

export default Profile;
