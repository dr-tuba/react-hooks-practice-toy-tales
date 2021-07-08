import React from "react";
import { useState } from 'react';

function ToyCard({ name, id, image, likes, handleDeleteClick, setToys }) {
  const [numOfLikes, setNumOfLikes] = useState(likes)

  const handleLikeClick = (e) => {
    const newLikes = numOfLikes + 1
    setNumOfLikes(newLikes)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
   }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{numOfLikes} Likes </p>
      <button onClick={handleLikeClick} className="like-btn">Like {"<3"}</button>
      <button id={id} onClick={handleDeleteClick}className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
