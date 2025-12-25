const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_SUCCESS":
      return { ...state, transactions: action.payload, loading: false };
    case "GET_ERROR":
      return { ...state, error: "Failed loading API", loading: false };
    case "ADD_SUCCESS":
      return { ...state, transactions: [...state.transactions, action.payload] };
    case "DELETE_SUCCESS":
      return { ...state, transactions: state.transactions.filter(tx => tx.id !== action.payload) };
    default:
      return state;
  }
};

export default AppReducer;
