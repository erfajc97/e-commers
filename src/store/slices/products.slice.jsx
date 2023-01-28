import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsloading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProdcuts: (state,action) =>{
            const products = action.payload;
            return products
        }

    }
})

export const getProductsTrunk = (state,action) => dispatch => {
    dispatch(setIsloading(true))
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products`)
      .then((res) => dispatch(setProdcuts(res.data)))
      .finally(() => {
            setTimeout(() => {  
                dispatch(setIsloading(false))
            }, 500);
      }
       
       );
}

export const filterProductThunk = (id) => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
      .get(
        `https://e-commerce-api-v2.academlo.tech/api/v1/products/?categoryId=${id}`
      )
      .then((res) => dispatch(setProdcuts(res.data)))
      .finally(() => dispatch(setIsloading(false)));
}

export const filterTitleThunk = (title) => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
      .get(
        `https://e-commerce-api-v2.academlo.tech/api/v1/products/?title=${title}`
      )
      .then((res) => dispatch(setProdcuts(res.data)))
      .finally(() => dispatch(setIsloading(false)));
}

// 

export const { setProdcuts  } = productsSlice.actions;

export default productsSlice.reducer;
