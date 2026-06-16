import { useState } from "react";
import CommentForm from "../commentForm/commentForm";
import "./ConspiracyCard.css"

function ConspiracyCard({ conspiracy , onConspiracyUpdated}) {
  const [showComments, setShowComments] = useState(false);
  
  const [likeNumber, setlikeNumber] = useState(conspiracy.likes);
  const [likePress, setlikePress] = useState(false);

  const [dislikeNumber, setdislikeNumber] = useState(conspiracy.disLikes);
  const [dislikePress, setdislikePress] = useState(false);

  const updateServerLikes = async (likeOrDiss="like") =>{
        try {
      const response = await fetch(`http://localhost:5000/conspiracies/${conspiracy._id}/updateLikesOrDiss`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            likes: conspiracy.likes,
            disLikes: conspiracy.disLikes
            }),
        });
      if (!response.ok) {
        throw new Error(`Failed to ${likeOrDiss} conspiracy`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleLike = async () => {
  if(!likePress){
    conspiracy.likes += 1;
    setlikeNumber(conspiracy.likes);
    if (dislikePress) {
      conspiracy.disLikes -= 1;
      setdislikeNumber(conspiracy.disLikes);
      setdislikePress(!dislikePress);
    }
  }else if(likePress){
      conspiracy.likes -= 1;
      setlikeNumber(conspiracy.likes);
    }
    try {
      await updateServerLikes("like");
    } catch (error) {
      console.error(error);
    }
    setlikePress(!likePress);
    onConspiracyUpdated();
  }
  const handleDislike = async () => {
  if(!dislikePress){
    conspiracy.disLikes += 1;
    setdislikeNumber(conspiracy.disLikes);
    if (likePress) {
      conspiracy.likes -= 1;
      setlikeNumber(conspiracy.likes);
        setlikePress(!likePress);
    }
  }else if(dislikePress){
      conspiracy.disLikes -= 1;
        setdislikeNumber(conspiracy.disLikes);
    }
    try {
      await updateServerLikes("like");
    } catch (error) {
      console.error(error);
    }
    setdislikePress(!dislikePress);
    onConspiracyUpdated();
  }
  return (
    <div className="conspiracy-card">
      <h3>{conspiracy.text}</h3>

      <p className="actions">
        <button onClick={handleLike} >👍 {likeNumber}</button> | <button onClick={handleDislike}>👎 {dislikeNumber}</button>
      </p>
      <button className="comments_button" onClick={() => setShowComments(!showComments)}>
        {showComments? "הסתר תגובות": `הצג תגובות (${conspiracy.comments.length})`}
      </button>
      <br/>
      {
        showComments &&
        <div className="comments">
        {conspiracy.comments.length === 0
          ? <p className="comments__empty">אין עדיין תגובות. היו הראשונים להגיב!</p>
          : conspiracy.comments.map((comment, index) => (
              <div key={index} className="comment-bubble">
                <span className="comment-bubble__author">{comment.author || "אנונימי"}</span>
                <span className="comment-bubble__text">{comment.text}</span>
              </div>
            ))
        }
        <CommentForm conspiracyId={conspiracy._id} onCommentAdded={onConspiracyUpdated} />
        </div>
      }
    </div>
  );
}

export default ConspiracyCard;