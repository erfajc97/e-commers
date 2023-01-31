import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsloading } from './isLoading.slice';

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      const purchases = action.payload;
      return purchases;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsloading(true));
    return axios
      .get(
        `https://e-commerce-api-v2.academlo.tech/api/v1/purchases`,
        getConfig()
      )
      .then((res) => dispatch(setPurchases(res.data)))
      .finally(() => dispatch(setIsloading(false)));
}

// https://e-commerce-api-v2.academlo.tech/api/v1/purchases

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
