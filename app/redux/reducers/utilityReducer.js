// /app/redux/reducers/utilityReducer.js

import { GET_COMMISIONERS_SUCCESS, GET_COACHES_SUCCESS } from "../actions/actionTypes";

export function commisioners(state = [], action) {
    switch (action.type) {
        case GET_COMMISIONERS_SUCCESS:
            return action.commisioners;
        default:
            return state;

    }
}

export function coaches(state = [], action) {
    switch (action.type) {
        case GET_COACHES_SUCCESS:
            return action.coaches;
        default:
            return state;
    }
}