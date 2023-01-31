import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice.jsx";

const Purchases = () => {

    const purchases = useSelector((state) => state.purchases);
    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getPurchasesThunk());
      }, []);

      console.log(purchases);
    return (
        <div>
            <h2>Purchases</h2>
        </div>
    );
};

export default Purchases;