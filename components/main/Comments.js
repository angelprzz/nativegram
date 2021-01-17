import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsersData } from "../../store/actions/index";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  const users = useSelector((store) => store.usersState.users);
  const dispatch = useDispatch();

  useEffect(() => {
    function matchUserToComments(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }

        const user = users.find((user) => user.uid === comments[i].creator);
        if (user == undefined) {
          dispatch(fetchUsersData(comments[i].creator, false));
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    if (props.route.params.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .doc(props.route.params.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComments(comments);
        });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComments(comments);
    }
  }, [props.route.params.postId, users]);

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .doc(props.route.params.postId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      });
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {item.user !== undefined ? <Text>{item.user.name}</Text> : null}
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={() => onCommentSend()} title="Send" />
      </View>
    </View>
  );
};

export default Comments;
