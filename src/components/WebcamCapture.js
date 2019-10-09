import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  state = { son: false };
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    const url = "http://localhost:3001/days/" + this.props.currentstatistics.id;
    axios
      .put(url, {
        ...this.props.currentstatistics,
        dailyimage: imageSrc
      })
      .then(response => {
        this.props.setCurrentStatistics({
          ...this.props.currentstatistics,
          dailyimage: imageSrc
        });
      });

    this.setState({ son: false });
  };

  changeButtonPhoto = () => {
    this.setState({ son: true });
    console.log("test");
  };
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    var buttonphoto = this.state.son ? (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
          name="testingimage"
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    ) : (
      <button onClick={this.changeButtonPhoto}>Take photo</button>
    );

    return <div>{buttonphoto}</div>;
  }
}

export default WebcamCapture;
