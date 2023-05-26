import {
  ADD_ITEM_TO_INVENTORY_ERROR,
  ADD_ITEM_TO_INVENTORY_LOADING,
  ADD_ITEM_TO_INVENTORY_SUCCESS,
  GET_INVENTORY_ITEM_ERROR,
  GET_INVENTORY_ITEM_LOADING,
  GET_INVENTORY_ITEM_SUCCESS,
  GET_SINGLE_INVENTORY_ITEM_ERROR,
  GET_SINGLE_INVENTORY_ITEM_LOADING,
  GET_SINGLE_INVENTORY_ITEM_SUCCESS,
  REMOVE_INVENTORY_ITEM_ERROR,
  REMOVE_INVENTORY_ITEM_LOADING,
  REMOVE_INVENTORY_ITEM_SUCCESS,
  UPDATE_INVENTORY_ITEM_ERROR,
  UPDATE_INVENTORY_ITEM_LOADING,
  UPDATE_INVENTORY_ITEM_SUCCESS,
} from "./inventory.actionType";

// Note: Do not update/change the initial state
const inventoryInitalState = {
  getInventryItems: {
    loading: false,
    error: false,
  },
  addInventryItem: {
    loading: false,
    error: false,
  },
  updateInventoryItem: {
    loading: false,
    error: false,
  },
  removeInventoryItem: {
    loading: false,
    error: false,
  },
  inventory: [],
  singleItem: {},
};
export const inventoryReducer = (
  state = inventoryInitalState,
  { type, payload }
) => {
  switch (type) {
    case GET_INVENTORY_ITEM_LOADING: {
      return { ...state, getInventryItems: { loading: true, error: false } };
    }
    case GET_INVENTORY_ITEM_SUCCESS: {
      return { ...state, inventory: payload, getInventryItems: { loading: false } };
    }
    case GET_INVENTORY_ITEM_ERROR: {
      return { ...state, getInventryItems: { loading: false, error: true } };
    }

    case GET_SINGLE_INVENTORY_ITEM_LOADING: {
      return { ...state, getInventryItems: { loading: true, error: false } };
    }
    case GET_SINGLE_INVENTORY_ITEM_SUCCESS: {
      return {
        ...state,
        singleItem: payload,
        getInventryItems: { loading: false },
      };
    }

    case GET_SINGLE_INVENTORY_ITEM_ERROR: {
      return { ...state, getInventryItems: { loading: false, error: true } };
    }
    case ADD_ITEM_TO_INVENTORY_LOADING: {
      return { ...state, addInventryItem: { loading: true, error: false } };
    }
    case ADD_ITEM_TO_INVENTORY_SUCCESS: {
      return {
        ...state,
        inventory: [...state.data, payload],
        addInventryItem: { loading: false },
      };
    }
    case ADD_ITEM_TO_INVENTORY_ERROR: {
      return { ...state, addInventryItem: { loading: false, error: true } };
    }
    case UPDATE_INVENTORY_ITEM_LOADING: {
      return { ...state, updateInventoryItem: { loading: true, error: false } };
    }
    case UPDATE_INVENTORY_ITEM_SUCCESS: {
      const newItems = state.inventory.map((ele) => {
        if (ele._id === payload.id) {
          return payload;
        } else return ele;
      });
      return {
        ...state,
        inventory: newItems,
        updateInventoryItem: { loading: false },
      };
    }
    case UPDATE_INVENTORY_ITEM_ERROR: {
      return { ...state, updateInventoryItem: { loading: false, error: true } };
    }
    case REMOVE_INVENTORY_ITEM_LOADING: {
      return { ...state, removeInventoryItem: { loading: true, error: false } };
    }
    case REMOVE_INVENTORY_ITEM_SUCCESS: {
      const newItems = state.inventory.filter((ele) => ele._id !== payload.id);
      return {
        ...state,
        inventory: newItems,
        removeInventoryItem: { loading: false },
      };
    }
    case REMOVE_INVENTORY_ITEM_ERROR: {
      return { ...state, removeInventoryItem: { loading: false, error: true } };
    }
    default: {
      return state;
    }
  }
};
