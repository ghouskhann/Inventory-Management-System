import React, { useReducer, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import AppReducer from "./AppReducer";
import api from "../services/api"; // your API calls

const initialState = {
  transactions: [],
  loading: true,
  error: null
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.getTransactions()
        .then(data => dispatch({ type: "GET_SUCCESS", payload: data }))
        .catch(() => dispatch({ type: "GET_ERROR" }));
    }
  }, []);

  const addTransaction = async (tx) => {
    const newTx = await api.createTransaction(tx);
    dispatch({ type: "ADD_SUCCESS", payload: newTx });
  };

  const deleteTransaction = async (id) => {
    await api.deleteTransaction(id);
    dispatch({ type: "DELETE_SUCCESS", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        addTransaction,
        deleteTransaction
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
