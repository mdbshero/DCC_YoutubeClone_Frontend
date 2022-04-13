const AddReply = (props) => {
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmitReply(e, props.index)}>
        <div>
          <input
          className="form-control mr-sm-2"
            type="text"
            placeholder="Reply"
            id="replyInputField"
            onChange={(e) => props.setReply(e.target.value)}
          />
        </div>
        <button className="btn btn-dark" type="submit" id="submitReplyButton">
          Reply
        </button>
      </form>
    </div>
  );
};

export default AddReply;
