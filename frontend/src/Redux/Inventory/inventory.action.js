// Inventory Actions here
import axios from "axios";
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

const baseURL = "http://localhost:8080/inventory";

// getAll Inventory Data sucess
export const getInventoryItems = () => async (dispatch) => {
  dispatch({ type: GET_INVENTORY_ITEM_LOADING });
  try {
    let res = await axios.get(`${baseURL}`);
    const { allInventory } = res.data;
    dispatch({ type: GET_INVENTORY_ITEM_SUCCESS, payload: allInventory });
  } catch (error) {
    dispatch({ type: GET_INVENTORY_ITEM_ERROR });
  }
};
// get single Inventory datail
export const getSingleInventoryItems = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_INVENTORY_ITEM_LOADING });
  try {
    let res = await axios.get(`${baseURL}/${id}`);
    const { singleProductDetail } = res.data;
    dispatch({
      type: GET_SINGLE_INVENTORY_ITEM_SUCCESS,
      payload: singleProductDetail,
    });
  } catch (error) {
    dispatch({ type: GET_SINGLE_INVENTORY_ITEM_ERROR });
  }
};

///add sucess
export const addItemToInventory =
  (token, InventoryInfo) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_INVENTORY_LOADING });
    try {
      const headers = {
        Authorization: `${token}`, // Include the token in the headers
      };
      let res = await axios.post(
        `${baseURL}/add`,

        {
          ...InventoryInfo,
        },
        { headers }
      );
      let data = res.data;

      dispatch({ type: ADD_ITEM_TO_INVENTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_INVENTORY_ERROR });
    }
  };

//remove items
export const removeItemFromInventory =
  (token, InventoryId) => async (dispatch) => {
    dispatch({ type: REMOVE_INVENTORY_ITEM_LOADING });
    try {
      const headers = {
        Authorization: `${token}`, // Include the token in the headers
      };
      let res = await axios.delete(`${baseURL}/delete/${InventoryId}`, {
        headers,
      });
      dispatch({
        type: REMOVE_INVENTORY_ITEM_SUCCESS,
        payload: { id: InventoryId },
      });
    } catch (error) {
      dispatch({ type: REMOVE_INVENTORY_ITEM_ERROR });
    }
  };

export const updateInventoryItem =
  (token, InventoryId, update) => async (dispatch) => {
    dispatch({ type: UPDATE_INVENTORY_ITEM_LOADING });

    try {
      const headers = {
        Authorization: `${token}`, // Include the token in the headers
      };
      let res = await axios.patch(
        `${baseURL}/update/${InventoryId}`,
        {
          ...update,
        },
        { headers }
      );
      dispatch({ type: UPDATE_INVENTORY_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_INVENTORY_ITEM_ERROR });
    }
  };
