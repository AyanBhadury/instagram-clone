import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import { Input, Button } from "@material-ui/core";
import firebase from "firebase/app";

function Posts({ imageUrl, username, caption, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)

        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src=""
        />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt=""></img>
      <h4 className="post_text">
        <strong>{username}: </strong>
        {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p key={comment.timestamp}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <Input
            className="post_input"
            placeholder="Add a comment..."
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Posts;
