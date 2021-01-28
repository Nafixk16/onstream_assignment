import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";

import { getCurrentVideoSrc } from "./redux/action";
class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: "",
      video: "",
      videoList: "",
      videoSrc: [
        "http://techslides.com/demos/sample-videos/small.mp4",
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        "https://www.w3schools.com/html/mov_bbb.ogg",
      ],
      stopped: false,
    };
  }
  componentDidMount = () => {};
  onMultipleVideoClick = (videoSrc, id) => {
    try {
      this.state.video.muted = true;
    } catch (error) {
      console.log("No video element");
    }
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let videoList = [];

    // here this.props.videoSrc is redux store
    this.props.videoSrc.forEach((value) => {
      let video = document.createElement("video");
      video.src = value;
      videoList.push(video);
    });
    this.setState({ videoList: videoList, ctx: ctx, isLoading: true });
    setTimeout(() => {
      let i = 0;
      let left = 0;
      this.setState({ isLoading: false });
      this.state.videoList.forEach((video) => {
        video.play();
        left = i * 400;
        console.log("video=", left);
        this.updateFrame(video, left, 400);
        i += 1;

        console.log("ended2");
        video.addEventListener("ended", () => {
          console.log("multiple end --------end");
          try {
            video.muted = true;
          } catch (error) {
            console.log("VIdeo cant be muted! Object not found");
          }
        });
      });
    }, 3000);
  };
  onVideoClick = (videoSrc, id) => {
    this.setState({ stopped: true, ctx: "" });
    try {
      this.state.video.muted = true;
    } catch (error) {
      console.log("No video element");
    }
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let video = document.createElement("video");
    video.src = videoSrc;
    this.setState({
      ctx: ctx,
      video: video,
      stopped: false,
      playId: id,
      isLoading: true,
    });
    setTimeout(() => {
      video.play();
      this.updateFrame(video, 0, 1200);
      this.setState({ isLoading: false });
      console.log("ended2");
    }, 2000);
    video.addEventListener("ended", () => {
      console.log("123end");
      video.muted = true;
      this.setState({ stopped: true, video: "", ctx: "" });
    });
  };

  updateFrame = (video, left, width) => {
    if (this.state.stopped) {
      video.muted = true;
      return;
    }
    this.state.ctx.drawImage(video, left, 0, width, 456);
    requestAnimationFrame(() => {
      this.updateFrame(video, left, width);
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="video-straming-wrapper">
          <div
            class="loader"
            style={this.state.isLoading ? { display: "" } : { display: "none" }}
          ></div>

          <div className="video-player">
            <canvas id="canvas" width={1200} height={456}></canvas>
          </div>
          <div className="video-btns">
            <button
              className="ripple pause"
              onClick={
                this.state.video !== ""
                  ? () => this.state.video.pause()
                  : () => alert("Select Video from list")
              }
            >
              Pause
            </button>
            <button
              className="ripple play"
              onClick={
                this.state.video !== ""
                  ? () => this.state.video.play()
                  : () => alert("Select Video from list")
              }
            >
              Play
            </button>
          </div>
          <div className="video-list">
            {/* https://youtu.be/vLnPwxZdW4Y */}
            <img
              className="cover-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVWK1fzwtP4HNnlryZy4bJdEIf-r03QYTT9Q&usqp=CAU"
              onClick={() => this.onMultipleVideoClick()}
            />
            <img
              className="cover-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6liI8rWc1cpaMAIOzRVI9KXljFaGhEQM4w&usqp=CAU"
              onClick={() =>
                this.onVideoClick(
                  "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                  "play1"
                )
              }
            />

            <img
              className="cover-img"
              src="https://blackdoctor.org/wp-content/uploads/2019/11/posttypevimeo-videop529670-vimeo-thumbnail.jpg"
              onClick={() =>
                this.onVideoClick(
                  "http://techslides.com/demos/sample-videos/small.mp4",
                  "play2"
                )
              }
            />
            <img
              className="cover-img"
              src="https://www.researchgate.net/profile/Jaume_Segura_Garcia/publication/320916970/figure/fig3/AS:667648576745482@1536191233299/A-frame-example-from-Big-Buck-Bunny-video-sequence.jpg"
              onClick={() =>
                this.onVideoClick(
                  "https://www.w3schools.com/html/mov_bbb.ogg",
                  "play3"
                )
              }
            />
          </div>
        </div>

        {/* <video src="http://techslides.com/demos/sample-videos/small.mp4"></video> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (store) => {
  return { videoSrc: store.videoSrc };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentVideoSrc: () => dispatch(getCurrentVideoSrc()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoStream);
