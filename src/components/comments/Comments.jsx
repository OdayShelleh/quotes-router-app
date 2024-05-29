import { useCallback, useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest: getComments,
    status,
    error,
    data: comments,
  } = useHttp(getAllComments);

  const addedCommentHandler = useCallback(() => {
    getComments(id);
  }, [getComments, id]);

  useEffect(() => {
    getComments(id);
  }, [id, getComments]);

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddedComment={addedCommentHandler} />
      )}
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status === "completed" && !error && comments?.length > 0 && (
        <CommentsList comments={comments} />
      )}
      {status === "completed" && !error && comments?.length === 0 && (
        <p>No comments were added yet!</p>
      )}
    </section>
  );
};

export default Comments;
