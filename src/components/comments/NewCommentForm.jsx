import { useEffect, useRef } from "react";

import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useParams } from "react-router-dom";

const NewCommentForm = (props) => {
  const { id } = useParams();
  const commentTextRef = useRef();
  const { sendRequest: sendComment, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [error, onAddedComment, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here

    // send comment to server
    sendComment({
      commentData: { text: commentTextRef.current.value },
      quoteId: id,
    });
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          required
          id="comment"
          rows="5"
          ref={commentTextRef}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
