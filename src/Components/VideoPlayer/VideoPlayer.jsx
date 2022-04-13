// import React, { useState } from 'react';


const VideoPlayer = (props) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
      className="embed-responsive-item"
        id="ytplayer"
        type="text/html"
        width="768"
        height="432"
        src={`https://www.youtube.com/embed/${props.videoId}`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
