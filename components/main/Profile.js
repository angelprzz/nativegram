import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import firebase from "firebase";

import { useSelector, useDispatch } from "react-redux";

const Profile = (props) => {
  const [userPost, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUser = useSelector((store) => store.userState.currentUser);
  const posts = useSelector((store) => store.userState.posts);

  useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("User does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("usersFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("usersFollowing")
      .doc(props.route.params.uid)
      .delete({});
  };

  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {isFollowing ? (
              <Button title="Following" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : null}
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
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

export default Profile;
