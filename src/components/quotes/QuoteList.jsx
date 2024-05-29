import { useState } from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useSearchParams } from "react-router-dom";

const sortQuotesByText = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.text.toLowerCase() < quoteB.text.toLowerCase() ? 1 : -1;
    }
    return quoteA.text.toLowerCase() > quoteB.text.toLowerCase() ? 1 : -1;
  });
};

const sortQuotesByAuthor = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.author.toLowerCase() < quoteB.author.toLowerCase() ? 1 : -1;
    }
    return quoteA.author.toLowerCase() > quoteB.author.toLowerCase() ? 1 : -1;
  });
};

const searchQuote = (quotes, searchedText, searchType) => {
  if (searchType === "author")
    return quotes.filter((quote) => {
      return quote.author.toLowerCase().includes(searchedText.toLowerCase());
    });

  return quotes.filter((quote) => {
    return quote.text.toLowerCase().includes(searchedText.toLowerCase());
  });
};

const QuoteList = (props) => {
  const [searchParamas, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("quote");

  let sortedQuotes;

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };

  const params = searchParamas.get("sort");

  const isTextAscending = params === "text_asc";
  const isAuthorAscending = params === "author_asc";

  sortedQuotes = searchQuote(props.quotes, searchText, searchType);
  if (params?.includes("text")) {
    sortedQuotes = sortQuotesByText(sortedQuotes, isTextAscending);
  } else {
    sortedQuotes = sortQuotesByAuthor(sortedQuotes, isAuthorAscending);
  }

  const changeSortTextHandler = () => {
    setSearchParams("sort=" + `${isTextAscending ? "text_desc" : "text_asc"}`);
  };
  const changeSortAuthorHandler = () => {
    setSearchParams(
      "sort=" + `${isAuthorAscending ? "author_desc" : "author_asc"}`
    );
  };

  const changeRadioHandler = (e) => {
    setSearchType(e.target.value);
  };

  const authorAscBtnText = `Ascending by author name ↓`;
  const authorDescBtnText = `Descending by author name ↑`;
  const quoteAscBtnText = `Ascending by quote ↓`;
  const quoteDescBtnText = `Descending by quote ↑`;
  return (
    <>
      <div className={classes.search}>
        <fieldset style={{ border: "none" }}>
          <legend>Please select your preferred search method:</legend>
          <div className={classes.radio}>
            <input
              id="quote"
              type="radio"
              value="quote"
              name="search"
              defaultChecked
              onChange={changeRadioHandler}
            />
            <label htmlFor="quote">By quote</label>

            <input
              id="author"
              type="radio"
              value="author"
              name="search"
              onChange={changeRadioHandler}
            />
            <label htmlFor="author">By author</label>
          </div>
        </fieldset>
        <input
          className={classes["searching-box"]}
          type="text"
          onChange={searchHandler}
          value={searchText}
          placeholder={`search for ${searchType}..`}
        />
      </div>
      <div className={classes.sorting}>
        <button
          className={params?.includes("text") ? "btn--edit" : "btn"}
          onClick={changeSortTextHandler}
        >
          Sort {isTextAscending ? quoteDescBtnText : quoteAscBtnText}
        </button>
        <button
          className={params?.includes("author") ? "btn--edit" : "btn"}
          onClick={changeSortAuthorHandler}
        >
          Sort {isAuthorAscending ? authorDescBtnText : authorAscBtnText}
        </button>
      </div>
      {sortedQuotes.length === 0 && <p className="centered">No quote match!</p>}
      <ul className={classes.list}>
        {sortedQuotes.reverse().map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
