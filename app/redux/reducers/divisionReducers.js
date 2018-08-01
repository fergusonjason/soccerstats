// /app/redux/reducers/divisionReducers.js

import { GET_ALL_DIVISIONS_SUCCESS, GET_DIVISION_SUCCESS, SET_CURRENT_DIVISION_ID } from "../actions/actionTypes";

export function divisions(state = [], action) {
    switch (action.type) {
        case GET_ALL_DIVISIONS_SUCCESS:
            console.log(`GET_ALL_DIVISIONS_SUCCESS: ${JSON.stringify(action)}`);
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

export function currentDivisionId(state = -1, action) {
    switch (action.type) {
        case SET_CURRENT_DIVISION_ID:
            return action.divisionId;
        default:
            return state;
    }
}