import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { currentVideoSrcReducer } from "./components/redux/reducer";
import reportWebVitals from "./reportWebVitals";
import VideoStream from "./components/videoStream";

const allReducer = combineReducers({
  videoSrc: currentVideoSrcReducer,
});
const VIDEO_STREAM = createStore(allReducer);
ReactDOM.render(
  <Provider store={VIDEO_STREAM}>
    <VideoStream />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
