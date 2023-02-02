import { configureStore } from '@reduxjs/toolkit'
import   purchasesSlice from './slices/purchases.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice  from './slices/products.slice'
import  cartSlice  from './slices/cart.slice'

export default configureStore({
    reducer: {
        isLoiding: isLoadingSlice,
        products: productsSlice,
        purchases: purchasesSlice,
        cart:cartSlice
    }
})
