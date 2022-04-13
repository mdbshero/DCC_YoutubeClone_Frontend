import react, { useState, useEffect } from "react";

import axios from "axios";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import SearchBar from "./Components/SearchBar/SearchBar";
import RelatedVideos from "./Components/RelatedVideos/RelatedVideos";
import CommentSection from "./Components/CommentSection/CommentSection";

function App() {
  const [videoID, setVideoID] = useState(
    async (text = "Doctor Strange in the Multiverse of Madness") => {
      const KEY = process.env.REACT_APP_KEY;
      let videoSearch = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${text}&key=${KEY}`
      );
      setVideoID(videoSearch.data.items[0].id.videoId);
      relatedVideos(videoSearch.data.items[0].id.videoId);
      commentSniffer(videoSearch.data.items[0].id.videoId);
    }
  );
  const [relatedVideoID, setRelatedVideoID] = useState([]);
  // const [comments, setComments] = useState([''])
  const [comments, setComments] = useState([]);

  ///WHEN YOU SEARCH FOR "DAFT" or "DAFT PUNK" it will return a channel first, which causes it to break.
  //Add proper functionality to prevent this
  const parseSearch = async (text) => {
    const KEY = process.env.REACT_APP_KEY;
    let videoSearch = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${text}&key=${KEY}`
    );
    setVideoID(videoSearch.data.items[0].id.videoId);
    relatedVideos(videoSearch.data.items[0].id.videoId);
    commentSniffer(videoSearch.data.items[0].id.videoId);
  };

  const videoIdSearch = async (text) => {
    const KEY = process.env.REACT_APP_KEY;
    let videoSearch = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${text}&key=${KEY}`
    );
    setVideoID(videoSearch.data.items[0].id.videoId);
    relatedVideos(videoSearch.data.items[0].id.videoId);
    commentSniffer(videoSearch.data.items[0].id.videoId);
  };

  const commentSniffer = async (searchString = videoID) => {
    let text = [];
    // let objComments = []
    let commentSection = await axios.get(
      `http://localhost:3001/api/${searchString}`
    );
    for (let i = 0; i < commentSection.data.length; i++) {
      text.push({
        text: commentSection.data[i].text,
        key: commentSection.data[i]._id,
        videoId: commentSection.data[i].videoId,
        replies: commentSection.data[i].replies.map((entry) => {
          return {
            text: entry.text,
            likes: entry.likes,
            dislikes: entry.dislikes,
            id: entry._id,
          };
        }),
        likes: commentSection.data[i].likes,
        dislikes: commentSection.data[i].dislikes,
      });
      // objComments.push(commentSection.data[i]._id)
    }
    // console.log(`text: ${JSON.stringify(text)}`)
    setComments([...text]);
    // setCommentList([...objComments])
    // console.log(objComments)
  };

  //WHY ARE SET STATE VARIABLES SO SLOW
  const relatedVideos = async (searchString = videoID) => {
    // setRelatedVideoID([])
    let test = [];
    const KEY = process.env.REACT_APP_KEY;
    // console.log(searchString)
    let relatedVideo = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${searchString}&type=video&key=${KEY}`
    );
    // console.log(relatedVideo)
    for (let i = 0; i < relatedVideo.data.items.length; i++) {
      // console.log(relatedVideo.data.items[i].id.videoId)
      test.push(relatedVideo.data.items[i].id.videoId);
    }
    // console.log(test)
    // console.log(`Hullabloo : ${relatedVideoID}`)
    setRelatedVideoID([...test]);
    // console.log(relatedVideoID)
  };

  return (
    <div className="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <div class="navbar-brand">FakeTube</div>
            <div>
              <SearchBar parseSearch={parseSearch} />
            </div>
            </div>
          </nav>
      <div className="row">
        <div className="col"></div>
        <div className="col mt-5">
          <VideoPlayer videoId={videoID} />
        </div>
        <div className="col">
          <RelatedVideos
            relatedVideoID={relatedVideoID}
            videoIdSearch={videoIdSearch}
          />
        </div>
      </div>
      <div className="container">
      <div className="row">
        <div className="col border border-dark border-3 rounded">
          <CommentSection
            videoId={videoID}
            commentSniffer={commentSniffer}
            comments={comments}
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
