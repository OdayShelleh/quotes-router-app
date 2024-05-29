import { Outlet, useParams } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";

const QuoteDetail = () => {
  const { id } = useParams();
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === id);

  const { sendRequest, data: quote, status, error } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  if (!quote) {
    return <h3>No Quote Found!</h3>;
  }
  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Outlet />
    </div>
  );
};

export default QuoteDetail;
