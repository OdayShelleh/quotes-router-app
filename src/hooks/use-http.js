import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      status: "pending",
      error: null,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      status: "completed",
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
};

const useHttp = (requestFunction, isPending) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    status: isPending ? "pending" : null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });

      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({ type: "ERROR", errorMessage: error.message });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
