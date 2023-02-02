import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsloading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state,action) => {
            const cart = action.payload;
            return cart

        }

    }
})

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
    .then((res) => dispatch(setCart(res.data)))
    .finally(() => dispatch(setIsloading(false)));
};


export const addproductIdThunk = (productId) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .post(
      "https://e-commerce-api-v2.academlo.tech/api/v1/cart",
      productId,
      getConfig()
    )
    .then((res) => dispatch(getCartThunk(res.data)))
    .catch(() => alert("hubo un error"))
    .finally(() => dispatch(setIsloading(false)));
};

export const purchasesCartThunk = () => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
      .post(
        `https://e-commerce-api-v2.academlo.tech/api/v1/purchases`,
        {},
        getConfig()
      )
      .then(() => dispatch(setCart([])))
      .finally(() => dispatch(setIsloading(false)));
}


export const deleteProductCarThunk = (id) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .delete(
      `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsloading(false)));
};
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
