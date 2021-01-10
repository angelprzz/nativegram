import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from "react-redux";

import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";

import { fetchUser, fetchUserPosts } from "../store/actions/index";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const Home = () => {
  const currentUser = useSelector((store) => store.userState.currentUser);
  const posts = useSelector((store) => store.userState.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
