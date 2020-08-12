import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase/app";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [upbutton, setUpButton] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    //selects the first file
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setUpButton(!upbutton);
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //listener
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
       // console.log(progress);
        setProgress(progress);
      },
      (error) => {
        alert(error.messgae);
      },
      () => {
        //upload function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post the image in db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setUpButton(true);
            setProgress(0);
            setCaption("");
            setImage(null);
          });
       
      }
    );
  };
  return (
    <div className="imageupload">
      <progress className="imageupload_progress" value={progress} max="100" />
      <Input
        placeholder="Enter a caption.."
        type="text"
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      <Input type="file" onChange={handleChange} />
      <Button
        variant="contained"
        className="imageupload_button"
        onClick={handleUpload}
        disabled={upbutton}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
