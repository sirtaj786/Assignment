import axios from "axios";

import * as types from "./action.type";

let fetchdata = (url) => (dispatch) => {
  dispatch({ type: types.Fetch_User_Details_loading });
  axios
    .post("https://cointab-zn40.onrender.com/user/fetchdata", { url })
    .then((res) => {
      dispatch({ type: types.Fetch_User_Details_Success });
    })
    .catch((err) => dispatch({ type: types.Fetch_User_Details_Error }));
};

let deletedata = () => async (dispatch) => {
  await dispatch({ type: types.Delete_User_Details_Loading });
  axios
    .delete("https://cointab-zn40.onrender.com/user/deleteall")
    .then((res) => {
      dispatch({ type: types.Delete_User_Details_Success });
    })
    .catch((err) => {
      dispatch({ type: types.Delete_User_Details_Error });
      console.log(err);
    });
};

let getdata = (page, params) => (dispatch) => {
  dispatch({ type: types.Get_User_Details_Loading });

  axios
    .get(
      `https://cointab-zn40.onrender.com/user/details?limit=10&page=${page}`,
      params
    )
    .then((res) => {
      dispatch({ type: types.Get_User_Details_Success, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.Get_User_Details_Error });
      console.log(err);
    });
};
export { fetchdata, deletedata, getdata };