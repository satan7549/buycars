import {
  GET_SEARCH_OEM_ITEM_ERROR,
  GET_SEARCH_OEM_ITEM_LOADING,
  GET_SEARCH_OEM_ITEM_SUCCESS,
} from "./oem.actionType";

export const oemInitalState = {
  loading: false,
  searchResults: [],
  error: false,
};

export const oemReducer = (state = oemInitalState, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_OEM_ITEM_LOADING: {
      return { ...state, loading: true };
    }
    case GET_SEARCH_OEM_ITEM_SUCCESS: {
      return {
        ...state,
        searchResults: payload,
        loading: false,
      };
    }
    case GET_SEARCH_OEM_ITEM_ERROR: {
      return { ...state, error: true };
    }
    default: {
      return state;
    }
  }
};
