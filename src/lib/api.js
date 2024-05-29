const URL =
  "https://react-http-2c057-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const getAllQuotes = async () => {
  const response = await fetch(`${URL}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
};

export const getSingleQuote = async (quoteId) => {
  const response = await fetch(`${URL}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
};

export const addQuote = async (quoteData) => {
  const response = await fetch(`${URL}/quotes.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return null;
};
export const editQuote = async (quoteData) => {
  const response = await fetch(`${URL}/quotes/${quoteData.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author: quoteData.author, text: quoteData.text }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return null;
};

export const addComment = async (requestData) => {
  const response = await fetch(`${URL}/comments/${requestData.quoteId}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData.commentData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return {
    commentId: data.name,
  };
};

export const getAllComments = async (quoteId) => {
  const response = await fetch(`${URL}/comments/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.unshift(commentObj);
  }

  return transformedComments;
};
