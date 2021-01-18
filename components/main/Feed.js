import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import firebase from "firebase";

import { useSelector, useDispatch } from "react-redux";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  const currentUser = useSelector((store) => store.userState.currentUser);
  const following = useSelector((store) => store.userState.following);
  const feed = useSelector((store) => store.usersState.feed);
  const usersFollowingLoaded = useSelector(
    (store) => store.usersState.usersFollowingLoaded
  );

  useEffect(() => {
    if (usersFollowingLoaded == following.length && following.length !== 0) {
      feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(feed);
    }
  }, [usersFollowingLoaded, feed]);

  const onLikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };

  const onDislikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

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
              {item.currentUserLike ? (
                <Button
                  title="Dislike"
                  onPress={() => onDislikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Like"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}
              <Text
                onPress={() =>
                  props.navigation.navigate("Comments", {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }
              >
                View Comments...
              </Text>
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
