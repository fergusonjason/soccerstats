// /app/redux/actions/utilityActions

import { LOADING } from "./actionTypes";

export const isLoadingData = (isLoadingBool) => {
    return {
        type: LOADING,
        isLoading: isLoadingBool
    }
}