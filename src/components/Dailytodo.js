import React, { useState } from "react";
import axios from "axios";
function Dailytodo({ currentstatistics, setCurrentStatistics }) {
  const onChangeRoom = e => {
    const url = "http://localhost:3001/days/" + currentstatistics.id;
    e.preventDefault();
    if (e.target.name === "nameFD") {
      axios
        .put(url, {
          ...currentstatistics,
          dailytodo: { ...currentstatistics.dailytodo, feedDog: true }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            dailytodo: { ...currentstatistics.dailytodo, feedDog: true }
          });
        });
    } else if (e.target.name === "nameRoom") {
      axios
        .put(url, {
          ...currentstatistics,
          dailytodo: { ...currentstatistics.dailytodo, room: true }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            dailytodo: { ...currentstatistics.dailytodo, room: true }
          });
        });
    }
  };

  var cleanroom =
    currentstatistics === 0 ? (
      ""
    ) : currentstatistics.dailytodo.room === true ? (
      "You cleaned your room"
    ) : (
      <button onClick={onChangeRoom} name="nameRoom">
        Clean Room
      </button>
    );

  var fdog =
    currentstatistics === 0 ? (
      ""
    ) : currentstatistics.dailytodo.feedDog === true ? (
      <p>You fed your dog! Yippi!</p>
    ) : (
      <button name="nameFD" onClick={onChangeRoom}>
        Feed Dog
      </button>
    );
  return (
    <div>
      <h4>Daily To-Do</h4>
      {cleanroom}
      {fdog}
    </div>
  );
}

export default Dailytodo;
