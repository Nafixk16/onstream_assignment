export const currentVideoSrcReducer = (state = "", action) => {
  switch (action.type) {
    case "getVideoSrc":
      return [
        "https://www.w3schools.com/html/mov_bbb.ogg",
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        "https://www.w3schools.com/html/mov_bbb.ogg",
      ];
    default:
      return [
        "http://techslides.com/demos/sample-videos/small.mp4",
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        "https://www.w3schools.com/html/mov_bbb.ogg",
      ];
  }
};
