import { useRef } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    console.log(enteredAuthor, enteredText);

    props.quote
      ? props.onEditQuote({
          id: props.quote.id,
          author: enteredAuthor,
          text: enteredText,
        })
      : props.onAddQuote({
          author: enteredAuthor,
          text: enteredText,
        });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input
            required
            type="text"
            id="author"
            defaultValue={props.quote?.author || ""}
            ref={authorInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea
            required
            id="text"
            rows="5"
            defaultValue={props.quote?.text || ""}
            ref={textInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button className="btn">
            {props.quote ? "Edit Quote" : "Add Quote"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
