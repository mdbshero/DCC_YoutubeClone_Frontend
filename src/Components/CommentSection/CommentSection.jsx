import React, { useEffect, useState } from "react";
import AddComment from "./AddComment/AddComment";
import AddReply from "./AddReply/AddReply";
import axios from "axios";

const CommentSection = (props) => {
  const [newComment, setNewComment] = useState();
  const [reply, setReply] = useState();
  // const [comments, setComments] = useState([''])
  // const [comments, setComments] = useState()

  // const commentSniffer = async () => {
  //   let text = []
  //   let commentSection = await axios.get(`http://localhost:3001/api/${props.videoId}`)
  //   for (let i = 0; i < commentSection.data.length; i++){
  //     text.push(commentSection.data[i].text)
  //   }
  //   console.log(`text: ${text}`)
  //   setComments([...text])
  // }

  useEffect(() => {
    props.commentSniffer();
  }, []);

  function handleComments(text) {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addComment = {
      text: newComment,
      videoId: props.videoId,
    };

    await axios
      .post("http://localhost:3001/api/", addComment)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
      });

    document.getElementById("commentInputField").value = "";
    props.commentSniffer();
  };

  const handleSubmitReply = async (e, commentId) => {
    e.preventDefault();
    const addReply = {
      text: reply,
    };

    await axios
      .post(`http://localhost:3001/api/${commentId}/replies`, addReply)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
      });

    document.getElementById("replyInputField").value = "";
    props.commentSniffer();
  };

  const handleLikes = async (event, comment) => {
    event.preventDefault();
    console.log(JSON.stringify(comment));
    let newLikes = {
      text: comment.text,
      videoId: comment.videoId,
      likes: (comment.likes += 1),
    };

    await axios
      .put(`http://localhost:3001/api/${comment.key}`, newLikes)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        props.commentSniffer();
      });
  };

  const handleDislikes = async (event, comment) => {
    event.preventDefault();
    console.log("TEST TEST TEST");
    let newDislikes = {
      text: comment.text,
      videoId: comment.videoId,
      dislikes: (comment.dislikes += 1),
    };
    console.log(JSON.stringify(newDislikes));
    await axios
      .put(`http://localhost:3001/api/${comment.key}`, newDislikes)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        props.commentSniffer();
      });
  };

  const handleLikesReply = async (event, comment, reply) => {
    event.preventDefault();
    let newLikes = {
      text: reply.text,
      likes: (reply.likes += 1),
      dislikes: reply.dislikes,
    };
    console.log(newLikes);

    await axios
      .put(
        `http://localhost:3001/api/${comment.key}/replies/${reply.id}`,
        newLikes
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        props.commentSniffer();
      });
  };

  const handleDislikesReply = async (event, comment, reply) => {
    event.preventDefault();
    let newDislikes = {
      text: reply.text,
      dislikes: (reply.dislikes += 1),
      likes: reply.likes,
    };
    await axios
      .put(
        `http://localhost:3001/api/${comment.key}/replies/${reply.id}`,
        newDislikes
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        props.commentSniffer();
      });
  };

  return (
    <div>
      <div className="navbar navbar-light bg-light">
        <div className="form-inline">
          <AddComment
            comment={newComment}
            setNewComment={setNewComment}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Comments</th>
            <th>Replies</th>
            <th>Add replies</th>
          </tr>
        </thead>
        <tbody>
          {props.comments.map((comment, index) => {
            return (
              <tr key={index}>
                <td>
                  <h5>{comment.text}</h5>
                  <div>
                    <button
                      className="btn btn-success btn-sm"
                      name={`likebutton${index}`}
                      onClick={(event) => handleLikes(event, comment)}
                    >
                      /\
                    </button>
                    <label htmlFor={`likebutton${index}`}>
                      <h5>{comment.likes}</h5>
                    </label>
                    <button
                      className="btn btn-danger btn-sm"
                      name={`dislikebutton${index}`}
                      onClick={(event) => handleDislikes(event, comment)}
                    >
                      \/
                    </button>
                    <label htmlFor={`dislikebutton${index}`}>
                      <h5>{comment.dislikes}</h5>
                    </label>
                  </div>
                </td>
                <td>
                  {comment.replies.map((reply, replyIndex) => {
                    return (
                      <div key={replyIndex}>
                        <h6>
                        {reply.text}
                        </h6>
                        <div>
                          <button
                            className="btn btn-success btn-sm"
                            name={`likebuttonReply${replyIndex}`}
                            onClick={(event) =>
                              handleLikesReply(event, comment, reply)
                            }
                          >
                            /\
                          </button>
                          <label htmlFor={`likebuttonReply${replyIndex}`}>
                            <h6>
                            {reply.likes}
                            </h6>
                          </label>
                          <button
                            className="btn btn-danger btn-sm"
                            name={`dislikebuttonReply${replyIndex}`}
                            onClick={(event) =>
                              handleDislikesReply(event, comment, reply)
                            }
                          >
                            \/
                          </button>
                          <label htmlFor={`dislikebuttonReply${replyIndex}`}>
                            <h6>
                            {reply.dislikes}
                            </h6>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </td>
                <td>
                  {" "}
                  <AddReply
                    handleSubmitReply={handleSubmitReply}
                    setReply={setReply}
                    index={comment.key}
                  />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommentSection;
