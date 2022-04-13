const AddComment = (props) => {
  return (
    <div>
      <form className="form-inline" onSubmit={(e) => props.handleSubmit(e)}>
        <div class="form-group mx-sm-3 mb-2">
          <input
            type="text"
            // value={props.comment}
            placeholder="Comment"
            id="commentInputField"
            onChange={(e) => props.setNewComment(e.target.value)}
          />{` `}
        <button className="btn btn-dark" type="submit" id="submitCommentButton">
          Create
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
