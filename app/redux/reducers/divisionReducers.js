// /app/redux/reducers/divisionReducers.js

import { GET_ALL_DIVISIONS_SUCCESS, GET_DIVISION_SUCCESS } from "../actions/actionTypes";

export function divisions(state = [], action) {
    switch (action.type) {
        case GET_ALL_DIVISIONS_SUCCESS:
            return action.divisions;
        default:
            return state;

    }
}

export function division(state = {}, action) {
    switch (action.type) {
        case GET_DIVISION_SUCCESS:
            return action.division;
        default:
            return state;
    }
}