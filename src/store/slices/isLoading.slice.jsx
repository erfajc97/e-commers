import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {

        setIsloading: (state, action) =>{
            const loading = action.payload;
            return loading;
        }

    }
})

export const { setIsloading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
