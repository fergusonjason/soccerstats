// /app/redux/actions/utilityActions

import { LOADING, GET_COACHES_SUCCESS, GET_COMMISIONERS_SUCCESS } from "./actionTypes";
import {queryPromise} from "./../../util/DbUtils";


export const isLoadingData = (isLoadingBool) => {
    return {
        type: LOADING,
        isLoading: isLoadingBool
    }
}

export const getAllCoaches = () => {

    return (dispatch) => {
        const sql = "SELECT * FROM V_COACHES";
        const params = [];
        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                console.log(`getAllCoaches result: ${JSON.stringify(queryResults)}`);
                dispatch(getAllCoachesSuccess(queryResults.result));
            });
    }
}

export const getAllCoachesSuccess = (coaches) => {
    return {
        type: GET_COACHES_SUCCESS,
        coaches: coaches
    }
}

export const getAllCommisioners = () => {

    return (dispatch) => {
        const sql = "SELECT * FROM V_COMMISIONERS";
        const params = [];
        dispatch(isLoadingData(true));
        queryPromise(sql, params)
            .then((queryResults) => {
                dispatch(isLoadingData(false));
                return queryResults;
            }).then((queryResults) => {
                dispatch(getAllCoachesSuccess(queryResults.result));
            })
    }
}

export const getAllCommisionersSuccess = (commisioners) => {
    return {
        type: GET_COMMISIONERS_SUCCESS,
        commisioners: commisioners
    }
}