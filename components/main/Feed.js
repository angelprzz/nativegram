import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import firebase from "firebase";

import { useSelector, useDispatch } from "react-redux";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const currentUser = useSelector((store) => store.userState.currentUser);
  const following = useSelector((store) => store.userState.following);
  const users = useSelector((store) => store.usersState.users);
  const usersLoaded = useSelector((store) => store.usersState.usersLoaded);

  useEffect(() => {
    let posts = [];
    if (usersLoaded == following.length) {
      for (let i = 0; i < following.length; i++) {
        const user = users.find((el) => el.uid === following[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }

      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });

      setPosts(posts);
    }
  }, [usersLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

export default Feed;
