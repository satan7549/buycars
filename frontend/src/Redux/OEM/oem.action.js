import axios from "axios";
import {
  GET_SEARCH_OEM_ITEM_ERROR,
  GET_SEARCH_OEM_ITEM_LOADING,
  GET_SEARCH_OEM_ITEM_SUCCESS,
} from "./oem.actionType";

const baseURL = "http://localhost:8080/oem";
// get oemData by search
export const oemDataSearchResult = (search) => async (dispatch) => {
  dispatch({ type: GET_SEARCH_OEM_ITEM_LOADING });
  try {
    let res = await axios.get(`${baseURL}?search=${search}`);
    let data = res.data;

    dispatch({ type: GET_SEARCH_OEM_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SEARCH_OEM_ITEM_ERROR });
  }
};
