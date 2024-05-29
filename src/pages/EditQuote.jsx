import { useNavigate, useParams } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { getSingleQuote, editQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const EditQuote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    sendRequest: getQuote,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote);

  const {
    sendRequest: editRequest,
    status: editStatus,
    error: editError,
  } = useHttp(editQuote);

  useEffect(() => {
    getQuote(id);
    if (editStatus === "completed") navigate("/quotes");
  }, [id, getQuote, editStatus, navigate]);

  if (status === "pending" || editStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if ((error, editError)) {
    return <div className="centered focused">{error || editError}</div>;
  }

  if (!quote) {
    return <h3>No Quote Found!</h3>;
  }
  const editQuoteHandler = (quote) => {
    editRequest(quote);
  };

  return (
    <QuoteForm
      quote={quote}
      onEditQuote={editQuoteHandler}
      isLoading={status === "pending"}
    />
  );
};

export default EditQuote;
